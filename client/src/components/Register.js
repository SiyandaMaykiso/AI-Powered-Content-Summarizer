import React, { useState } from 'react';
import api from '../api'; // Ensure your Axios instance is set up in ../api

const Register = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/register', { username, password });
            const { message } = response.data; // Message from the server
            setMessage(message); // Display success message
            if (onRegister) onRegister(); // Trigger any parent component logic (optional)
        } catch (error) {
            console.error('Registration failed:', error.response?.data || error.message);
            setMessage('Registration failed. Please try again.'); // Display error message
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Register;