import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Clear the token
        navigate('/'); // Redirect to Home page
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1565c0', padding: '0 16px' }}>
            <Toolbar>
                {/* App Title */}
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        color: '#fff',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                    }}
                >
                    AI-Powered Content Summarizer
                </Typography>

                {/* Navigation Links */}
                <Box>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/" 
                        sx={{ fontWeight: 'bold', margin: '0 8px' }}
                    >
                        Home
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/summarize" 
                        sx={{ fontWeight: 'bold', margin: '0 8px' }}
                    >
                        Summarize
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/history" 
                        sx={{ fontWeight: 'bold', margin: '0 8px' }}
                    >
                        History
                    </Button>
                    <Button 
                        color="inherit" 
                        onClick={handleLogout} 
                        sx={{ fontWeight: 'bold', margin: '0 8px' }}
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;