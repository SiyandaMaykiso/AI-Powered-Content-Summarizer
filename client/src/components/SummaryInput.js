import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';

const SummaryInput = ({ onSummarizeText, onSummarizeFile }) => {
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const theme = useTheme(); 

    const handleTextSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            setError('');
            onSummarizeText(content); 
            setContent(''); 
        } else {
            setError('Content cannot be empty.');
        }
    };

    const handleFileSubmit = (e) => {
        e.preventDefault();
        if (file) {
            setError('');
            onSummarizeFile(file); 
            setFile(null); 
        } else {
            setError('Please select a file to upload.');
        }
    };

    return (
        <div
            style={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '20px',
                boxShadow: theme.palette.mode === 'dark' ? '0px 4px 10px rgba(0, 0, 0, 0.6)' : '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            {}
            <form onSubmit={handleTextSubmit} style={{ marginBottom: '20px' }}>
                <textarea
                    placeholder="Enter content to summarize..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="5"
                    cols="50"
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '1rem',
                        marginBottom: '10px',
                        borderRadius: '4px',
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        border: `1px solid ${theme.palette.text.secondary}`,
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '4px',
                    }}
                >
                    Summarize Text
                </button>
            </form>

            {}
            <form onSubmit={handleFileSubmit}>
                <label
                    style={{
                        display: 'block',
                        marginBottom: '5px',
                        fontSize: '0.9rem',
                        color: theme.palette.text.secondary,
                    }}
                >
                    Upload a PDF or Word Doc file to summarize: (Max: 5 MB)
                </label>
                <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{
                        display: 'block',
                        marginBottom: '10px',
                        padding: '5px',
                        fontSize: '1rem',
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        border: `1px solid ${theme.palette.text.secondary}`,
                        borderRadius: '4px',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '4px',
                    }}
                >
                    Summarize File
                </button>
            </form>

            {}
            {error && <p style={{ color: theme.palette.error.main, marginTop: '10px' }}>{error}</p>}
        </div>
    );
};

export default SummaryInput;