import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import DashboardPage from '../pages/DashboardPage';
import PrivateRoute from '../components/auth/PrivateRoute';
import NotFoundPage from '../pages/NotFoundPage';

const AppRouter = () => {
    
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/app" element={<PrivateRoute />} >
                    <Route index  element={<DashboardPage />} />
                </Route>
                <Route path='/' element={<Navigate to={'/login'} />} />
                {/* <Route path="/" element={<HomePage />} /> */}
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </Router>
    )
}

export default AppRouter