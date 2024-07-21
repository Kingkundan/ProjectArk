import axios from "axios";
import { store } from "../redux/store";
import { logOut, setIsAuthenticated } from "../redux/reducers/authSlice";
import { jwtDecode } from "jwt-decode";


const API_URL = "https://localhost:7167/api/";

export const RefreshToken = async (token: string | null) => {

    try {
        const response = await axios.post(`${API_URL}auth/RefreshToken`, {}, { withCredentials: true, });

        const newToken = response.data;
        localStorage.setItem("accessToken", newToken);
        token = localStorage.getItem('accessToken');
        store.dispatch(setIsAuthenticated(true));
    } catch (error) {
        store.dispatch(logOut());
        window.location.href = "/login";
    }
    return token;
}
// Create an Axios instance
export const api = axios.create({
    baseURL: API_URL
});

const idleTimeout = 60000*20; 

api.interceptors.request.use(
    async (config) => {
        let DateNow = Date.now();
        let token = localStorage.getItem("accessToken");  
        let Data = localStorage.getItem("LastAccess");
        let lastAccessTime =Data!==null ? parseInt(Data) : Date.now()-idleTimeout-1;      

        if (token) {
            if(DateNow-lastAccessTime>idleTimeout){
                store.dispatch(logOut());
                localStorage.removeItem('LastAccess');
                return config;
            }
            else{
                localStorage.setItem("LastAccess", DateNow.toString());
            }
            const decodedToken: any = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
                token = await RefreshToken(token);

            }
            
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        else{
            token = await RefreshToken(token);
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            store.dispatch(logOut());
            window.location.href = "/"; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

