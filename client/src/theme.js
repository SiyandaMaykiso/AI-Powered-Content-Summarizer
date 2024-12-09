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
            default: '#ffffff', // White background for the app
            paper: '#f5f5f5', // Light gray background for cards/panels
        },
        text: {
            primary: '#333', // Dark gray text for main content
            secondary: '#666', // Lighter gray for supporting text
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
            color: '#333', // Ensure the heading adapts to the primary text color
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 400,
        },
        body1: {
            fontSize: '1rem',
            color: '#333', // Body text uses primary text color
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // Avoid uppercase transformation
                },
            },
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark', // Dark mode
        primary: {
            main: '#1e88e5', // Lighter blue for contrast
        },
        secondary: {
            main: '#ffb74d', // Lighter orange for highlights
        },
        background: {
            default: '#121212', // Dark background for the app
            paper: '#1e1e1e', // Slightly lighter dark gray for cards/panels
        },
        text: {
            primary: '#e0e0e0', // Light gray for main content
            secondary: '#b0b0b0', // Dim gray for supporting text
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
            color: '#e0e0e0', // Ensure the heading adapts to the primary text color
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 400,
        },
        body1: {
            fontSize: '1rem',
            color: '#e0e0e0', // Body text uses primary text color
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // Avoid uppercase transformation
                },
            },
        },
    },
});