import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home'; // Import the Home component
import Navbar from './components/Navbar'; // Import the Navbar component
import SummaryApp from './components/SummaryApp'; // Import the SummaryApp component

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
                <Route path="/summarize" element={<SummaryApp />} /> {/* Add the SummaryApp route */}
            </Routes>
        </Router>
    );
};

export default AppRouter;