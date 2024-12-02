import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import api from '../api';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { username, password });
            const { token } = response.data;

            // Save the token to localStorage
            localStorage.setItem('token', token);

            // Call the onLogin function passed as a prop
            onLogin(token);

            // Clear any previous error messages
            setErrorMessage('');
        } catch (error) {
            console.error('Login failed:', error.message);
            setErrorMessage('Invalid username or password. Please try again.');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1565c0' }}>
                Login
            </Typography>

            {/* Username Field */}
            <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                fullWidth
            />

            {/* Password Field */}
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
            />

            {/* Error Message */}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            {/* Submit Button */}
            <Button
                type="submit"
                variant="contained"
                sx={{
                    backgroundColor: '#1565c0',
                    '&:hover': {
                        backgroundColor: '#0d47a1',
                    },
                }}
            >
                Login
            </Button>
        </Box>
    );
};

export default Login;