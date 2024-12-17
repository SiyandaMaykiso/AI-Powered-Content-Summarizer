import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import api from '../api';

const Register = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/register', { username, password });
            const { message } = response.data;

            
            setMessage(message);
            setError('');

            
            onRegister();
        } catch (error) {
            console.error('Registration failed:', error.response?.data || error.message);

            
            setError('Registration failed. Please try again.');
            setMessage('');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleRegister}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1565c0' }}>
                Register
            </Typography>

            {}
            <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                fullWidth
            />

            {}
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
            />

            {}
            {message && <Alert severity="success">{message}</Alert>}

            {}
            {error && <Alert severity="error">{error}</Alert>}

            {}
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
                Register
            </Button>
        </Box>
    );
};

export default Register;