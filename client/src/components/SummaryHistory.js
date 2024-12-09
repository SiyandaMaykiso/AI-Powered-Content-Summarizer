import React, { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline, Button } from '@mui/material'; // Import Material-UI components
import Footer from './Footer'; // Import the Footer component
import { lightTheme, darkTheme } from '../theme'; // Import themes
import api from '../api';

const SummaryHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // Persist theme

    useEffect(() => {
        // Save theme preference to localStorage whenever it changes
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await api.get('/summaryhistory', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the token for authentication
                    },
                });
                setHistory(response.data.summaryHistory); // Set the fetched history
            } catch (err) {
                setError('Failed to fetch summary history.');
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    if (loading) return <p>Loading summary history...</p>;
    if (error) return <p>{error}</p>;

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <CssBaseline />
            <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                <Button
                    variant="contained"
                    onClick={toggleTheme}
                    style={{
                        marginBottom: '20px',
                        backgroundColor: theme === 'light' ? '#007bff' : '#1e88e5',
                        color: '#fff',
                    }}
                >
                    Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
                </Button>

                <h2 style={{ color: theme === 'light' ? '#333' : '#e0e0e0' }}>Summary History</h2>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {history.length > 0 ? (
                        history.map((item) => (
                            <li
                                key={item.id}
                                style={{
                                    marginBottom: '20px',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    backgroundColor: theme === 'light' ? '#f9f9f9' : '#2c2c2c',
                                    color: theme === 'light' ? '#333' : '#e0e0e0',
                                }}
                            >
                                <strong>Original Content:</strong>
                                <p>{item.content}</p>
                                <strong>Summary:</strong>
                                <p>{item.summary}</p>
                                <small>
                                    <em>Created At: {new Date(item.createdAt).toLocaleString()}</em>
                                </small>
                            </li>
                        ))
                    ) : (
                        <p>No summaries available yet.</p>
                    )}
                </ul>
            </div>
            <Footer /> {/* Include the Footer component */}
        </ThemeProvider>
    );
};

export default SummaryHistory;