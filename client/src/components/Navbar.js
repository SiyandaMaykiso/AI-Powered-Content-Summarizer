import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
                        to="/login" 
                        sx={{ fontWeight: 'bold', margin: '0 8px' }}
                    >
                        Login
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/register" 
                        sx={{ fontWeight: 'bold', margin: '0 8px' }}
                    >
                        Register
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/summarize" 
                        sx={{ fontWeight: 'bold', margin: '0 8px' }}
                    >
                        Summarize
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;