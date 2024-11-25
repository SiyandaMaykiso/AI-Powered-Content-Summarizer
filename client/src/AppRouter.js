import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import SummaryApp from './components/SummaryApp';
import SummaryHistory from './components/SummaryHistory';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

const AppRouter = () => {
    // Define the onLogin function
    const handleLogin = (token) => {
        console.log('User logged in, token:', token);
        // Store the token in localStorage for authentication purposes
        localStorage.setItem('authToken', token);
    };

    return (
        <Router>
            <Navbar /> {/* Add the Navbar */}
            <Routes>
                <Route path="/" element={<Home />} /> {/* Add the Home route */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route
                    path="/summarize"
                    element={
                        <ProtectedRoute>
                            <SummaryApp />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <SummaryHistory />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default AppRouter;