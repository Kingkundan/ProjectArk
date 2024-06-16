
import { useState } from "react";
import loginBg from "../../assets/images/PropertyLogin.png"
import { Navigate } from "react-router-dom";
import { login, selectAuth } from "../../redux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";

const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>('');
    const dispatch: AppDispatch = useDispatch();
    const authInfo = useSelector(selectAuth);

    if (authInfo.isAuthenticated) {
        return (<Navigate to={'/app'} />);
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        dispatch(login({ username: username, password: password }));
    };

    return (
        <div className="flex h-[100vh] items-center justify-center">
            <div className="flex h-full w-1/2 items-center justify-start" >
                <div className="w-[400px] m-20 p-8">
                    <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
                    <p className="mt-3 text-sm font-medium text-gray-400">Welcome back! Please enter your details.</p>
                    <form className="mt-8" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                            <input className="mt-2 w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" type="text" onChange={(e) => (setUsername(e.target.value))} id="email" placeholder="hi@example.com" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                            <input className="mt-2 w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" type="password" id="password" onChange={(e) => (setPassword(e.target.value))} placeholder="Enter password" />
                        </div>
                        <div className="flex justify-between items-center">
                            <a href="#" className="font-semibold text-sm text-indigo-500 hover:underline">Forgot Password?</a>
                        </div>
                        <button className="mt-6 font-semibold text-sm w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Login</button>
                        <button type="button"
                            className="mt-4 font-semibold text-sm w-full py-3 bg-white text-black border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600">
                            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-6 h-6 mr-2" />
                            Continue with Google
                        </button>
                    </form>
                    <p className="mt-8 text-sm text-center text-gray-600">Don't have an account? <a href="#" className="font-semibold text-indigo-500 hover:underline">Sign up for free</a></p>
                </div>
            </div>
            <div className="flex h-full w-1/2 items-center justify-center overflow-hidden" >
                <div className="w-full h-full relative">
                    <img src={loginBg} alt="Property" className="bg-cover" />

                </div>
            </div>
        </div>
    );
};

export default Login;
