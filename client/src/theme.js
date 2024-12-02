import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1565c0', // Blue
        },
        secondary: {
            main: '#ff9800', // Orange
        },
        background: {
            default: '#f5f5f5', // Light gray
        },
        text: {
            primary: '#333', // Dark gray
            secondary: '#666', // Light gray
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

export default theme;