import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import Login from './Login';
import Register from './Register';
import Footer from './Footer'; // Import the Footer component
import { useNavigate } from 'react-router-dom';

const Home = ({ onLogin }) => {
    const navigate = useNavigate();

    const handleLogin = (token) => {
        onLogin(token); // Call the parent onLogin function
        navigate('/summarize'); // Redirect to the summarize page
    };

    const handleRegister = () => {
        navigate('/summarize'); // Redirect to the summarize page after registration
    };

    return (
        <>
            <Box
                sx={{
                    textAlign: 'center',
                    marginTop: '40px',
                    padding: '20px',
                }}
            >
                {/* Welcome Header */}
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 'bold',
                        marginBottom: '20px',
                        color: '#1565c0',
                    }}
                >
                    Welcome to the AI-Powered Content Summarizer!
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: '#555',
                        marginBottom: '30px',
                    }}
                >
                    Your one-stop solution for concise and clear text summarization.
                </Typography>

                {/* Forms Container */}
                <Grid container spacing={3} justifyContent="center">
                    {/* Login Section */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper
                            elevation={3}
                            sx={{
                                padding: '20px',
                                borderRadius: '10px',
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 'bold',
                                    marginBottom: '15px',
                                    color: '#1565c0',
                                }}
                            >
                             
                            </Typography>
                            <Login onLogin={handleLogin} />
                        </Paper>
                    </Grid>

                    {/* Register Section */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper
                            elevation={3}
                            sx={{
                                padding: '20px',
                                borderRadius: '10px',
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 'bold',
                                    marginBottom: '15px',
                                    color: '#1565c0',
                                }}
                            >
                                
                            </Typography>
                            <Register onRegister={handleRegister} />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <Footer /> {/* Include the Footer component */}
        </>
    );
};

export default Home;