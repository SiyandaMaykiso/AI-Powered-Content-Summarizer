import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken'); 
        navigate('/'); 
    };

    return (
        <AppBar
            position="sticky"
            elevation={4}
            sx={{
                backgroundColor: '#1565c0',
                padding: { xs: '8px 16px', sm: '10px 24px' },
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {}
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        color: '#fff',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        fontSize: { xs: '1rem', sm: '1.25rem' },
                        '&:hover': { textDecoration: 'underline' },
                    }}
                >
                    AI-Powered Content Summarizer
                </Typography>

                {}
                <Box sx={{ display: 'flex', gap: { xs: '8px', sm: '16px' } }}>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/"
                        sx={{
                            fontWeight: 'bold',
                            textTransform: 'none',
                            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                        }}
                    >
                        Home
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/summarize"
                        sx={{
                            fontWeight: 'bold',
                            textTransform: 'none',
                            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                        }}
                    >
                        Summarize
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/history"
                        sx={{
                            fontWeight: 'bold',
                            textTransform: 'none',
                            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                        }}
                    >
                        History
                    </Button>
                    <Button
                        color="inherit"
                        onClick={handleLogout}
                        sx={{
                            fontWeight: 'bold',
                            textTransform: 'none',
                            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;