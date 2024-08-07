import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { logOut } from "../redux/reducers/authSlice";
import { AppDispatch } from "../redux/store";

const isTokenExpired = (token: string): boolean => {
  const decodedToken: any = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

const getTokenExpiration = (token: string): number => {
  const decodedToken: any = jwtDecode(token);
  return decodedToken.exp * 1000; // Convert to milliseconds
};

const useTokenExpiration = (token: string | null) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    if (isTokenExpired(token)) {
      dispatch(logOut());
    } else {
      const expirationTime = getTokenExpiration(token);
      const timeoutId = setTimeout(() => {
        dispatch(logOut());
      }, expirationTime - Date.now());

      return () => clearTimeout(timeoutId);
    }
  }, [token, dispatch]);
};

export default useTokenExpiration;

const API_URL = "https://localhost:7167/api/";

export const loginApi = async (credentials: {
  username: string;
  password: string;
}) => {
  return await axios.post(`${API_URL}auth/login`, credentials,{withCredentials:true});
};

export const logOutApi = async () => {
  return await axios.post(`${API_URL}auth/logout`,{},{withCredentials:true});
};

export const registerApi = async (data: {
  email: string;
  password: string;
  name: string;
}) => {
  return await axios.post(`${API_URL}/auth/register`, data);
};
