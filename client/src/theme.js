import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light', // Light mode
        primary: {
            main: '#1565c0', // Blue
        },
        secondary: {
            main: '#ff9800', // Orange
        },
        background: {
            default: '#ffffff', // White
            paper: '#f5f5f5', // Light gray
        },
        text: {
            primary: '#333', // Dark gray
            secondary: '#666', // Lighter gray
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 400,
        },
        body1: {
            fontSize: '1rem',
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark', // Dark mode
        primary: {
            main: '#1e88e5', // Lighter blue
        },
        secondary: {
            main: '#ffb74d', // Lighter orange
        },
        background: {
            default: '#121212', // Dark gray
            paper: '#1e1e1e', // Slightly lighter gray
        },
        text: {
            primary: '#e0e0e0', // Light gray
            secondary: '#b0b0b0', // Dimmer gray
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 400,
        },
        body1: {
            fontSize: '1rem',
        },
    },
});