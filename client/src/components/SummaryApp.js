import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../theme'; // Import themes from theme.js
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
    const [theme, setTheme] = useState('light');

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

    const handleSummarizeFile = async (file) => {
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await api.post('/summarize/file', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setSummary(response.data.summary);
            } else {
                setError('Failed to fetch file summary.');
            }
        } catch (error) {
            setError('An error occurred while summarizing the file.');
        } finally {
            setLoading(false);
        }
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ textAlign: 'center', color: theme === 'light' ? '#333' : '#e0e0e0' }}>
                    AI-Powered Content Summarizer
                </h1>

                <button
                    onClick={toggleTheme}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: theme === 'light' ? '#007bff' : '#1e88e5',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginBottom: '20px',
                    }}
                >
                    Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
                </button>

                {loading && (
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress />
                        <p style={{ color: 'blue' }}>Processing your request...</p>
                    </div>
                )}

                {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

                {!loading && (
                    <>
                        <SummaryInput
                            onSummarizeText={handleSummarizeText}
                            onSummarizeFile={handleSummarizeFile}
                        />
                        <SummaryDisplay summary={summary} />
                        {summary && (
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <button
                                    onClick={handleCopyToClipboard}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#007bff',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        marginRight: '10px',
                                    }}
                                >
                                    Copy to Clipboard
                                </button>
                                <button
                                    onClick={handleDownloadSummary}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#28a745',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Download as Word Document
                                </button>
                                {copied && <p style={{ color: 'green', marginTop: '10px' }}>Copied to clipboard!</p>}
                            </div>
                        )}
                    </>
                )}
            </div>
        </ThemeProvider>
    );
};

export default SummaryApp;