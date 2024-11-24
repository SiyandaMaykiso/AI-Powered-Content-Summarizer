import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

const AppRouter = () => {
    // Define the onLogin function
    const handleLogin = (token) => {
        console.log('User logged in, token:', token);
        // You can also store the token in localStorage or context if needed
        localStorage.setItem('authToken', token);
    };

    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                {/* Add other routes here */}
            </Routes>
        </Router>
    );
};

export default AppRouter;