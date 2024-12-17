import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light', 
        primary: {
            main: '#1565c0', 
        },
        secondary: {
            main: '#ff9800', 
        },
        background: {
            default: '#ffffff', 
            paper: '#f5f5f5', 
        },
        text: {
            primary: '#333', 
            secondary: '#666', 
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
            color: '#333', 
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 400,
        },
        body1: {
            fontSize: '1rem',
            color: '#333', 
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', 
                },
            },
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark', 
        primary: {
            main: '#1e88e5', 
        },
        secondary: {
            main: '#ffb74d', 
        },
        background: {
            default: '#121212', 
            paper: '#1e1e1e', 
        },
        text: {
            primary: '#e0e0e0', 
            secondary: '#b0b0b0', 
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
            color: '#e0e0e0', 
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 400,
        },
        body1: {
            fontSize: '1rem',
            color: '#e0e0e0', 
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', 
                },
            },
        },
    },
});