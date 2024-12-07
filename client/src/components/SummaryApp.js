import React, { useState } from 'react';
import SummaryInput from './SummaryInput';
import SummaryDisplay from './SummaryDisplay';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import { Document, Packer, Paragraph } from 'docx'; // Import docx for Word file generation
import api from '../api'; // Ensure correct API instance import

const SummaryApp = () => {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const [error, setError] = useState(null); // Add error state
    const [copied, setCopied] = useState(false); // Add copied state for clipboard feedback

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(summary)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
            })
            .catch(err => {
                console.error('Failed to copy text:', err.message);
            });
    };

    const handleDownloadSummary = async () => {
        // Create a new Word document
        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph("Summary"), // Add a title
                        new Paragraph(summary), // Add the summary
                    ],
                },
            ],
        });

        // Convert document to a Blob
        const blob = await Packer.toBlob(doc);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'summary.docx'; // Set the filename
        link.click();
    };

    const handleSummarizeText = async (content) => {
        setLoading(true);
        setError(null);

        try {
            console.log('Sending request to /summarize with content:', content);

            const response = await api.post('/summarize', { content }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include token if needed
                },
            });

            console.log('API Response:', response.data);

            if (response.status === 200) {
                setSummary(response.data.summary);
            } else {
                console.error('Failed to fetch summary');
                setError('Failed to fetch summary.');
            }
        } catch (error) {
            console.error('Error summarizing content:', error.message);
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

            console.log('Sending file request to /summarize/file with file:', file.name);

            const response = await api.post('/summarize/file', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('API Response:', response.data);

            if (response.status === 200) {
                setSummary(response.data.summary);
            } else {
                console.error('Failed to fetch file summary');
                setError('Failed to fetch file summary.');
            }
        } catch (error) {
            console.error('Error summarizing file:', error.message);
            setError('An error occurred while summarizing the file.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>AI-Powered Content Summarizer</h1>

            {/* Show progress indicator while loading */}
            {loading && (
                <div style={{ textAlign: 'center' }}>
                    <CircularProgress />
                    <p style={{ color: 'blue' }}>Processing your request...</p>
                </div>
            )}

            {/* Show error message if any */}
            {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

            {/* Hide inputs and display summary when not loading */}
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
    );
};

export default SummaryApp;