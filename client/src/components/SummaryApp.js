import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Container, Button } from '@mui/material'; // Added CssBaseline and Container for global and responsive styling
import { lightTheme, darkTheme } from '../theme';
import SummaryInput from './SummaryInput';
import SummaryDisplay from './SummaryDisplay';
import CircularProgress from '@mui/material/CircularProgress';
import { Document, Packer, Paragraph } from 'docx';
import api from '../api';

const SummaryApp = () => {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // Load theme from localStorage

    useEffect(() => {
        // Save theme preference to localStorage whenever it changes
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(summary)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch((err) => console.error('Failed to copy text:', err.message));
    };

    const handleDownloadSummary = async () => {
        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph("Summary"),
                        new Paragraph(summary),
                    ],
                },
            ],
        });

        const blob = await Packer.toBlob(doc);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'summary.docx';
        link.click();
    };

    const handleSummarizeText = async (content) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/summarize', { content }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            if (response.status === 200) {
                setSummary(response.data.summary);
            } else {
                setError('Failed to fetch summary.');
            }
        } catch (error) {
            setError('An error occurred while summarizing the content.');
        } finally {
            setLoading(false);
        }
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <CssBaseline />
            <Container maxWidth="md" style={{ padding: '20px', textAlign: 'center' }}>
                <h1>AI-Powered Content Summarizer</h1>
                <Button
                    variant="contained"
                    onClick={toggleTheme}
                    style={{ marginBottom: '20px' }}
                >
                    Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
                </Button>

                {loading && (
                    <div>
                        <CircularProgress />
                        <p style={{ color: 'blue' }}>Processing your request...</p>
                    </div>
                )}

                {error && <p style={{ color: 'red' }}>{error}</p>}

                {!loading && (
                    <>
                        <SummaryInput
                            onSummarizeText={handleSummarizeText}
                            onSummarizeFile={(file) => console.log('File upload:', file)}
                        />
                        <SummaryDisplay summary={summary} />
                        {summary && (
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCopyToClipboard}
                                    style={{ marginRight: '10px' }}
                                >
                                    Copy to Clipboard
                                </Button>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={handleDownloadSummary}
                                >
                                    Download as Word Document
                                </Button>
                                {copied && <p style={{ color: 'green' }}>Copied to clipboard!</p>}
                            </div>
                        )}
                    </>
                )}
            </Container>
        </ThemeProvider>
    );
};

export default SummaryApp;