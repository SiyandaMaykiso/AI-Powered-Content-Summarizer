import React, { useState } from 'react';
import SummaryInput from './SummaryInput';
import SummaryDisplay from './SummaryDisplay';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import api from '../api'; // Ensure correct API instance import

const SummaryApp = () => {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const [error, setError] = useState(null); // Add error state

    const handleSummarizeText = async (content) => {
        setLoading(true); // Start loading indicator
        setError(null); // Reset error state

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
            setLoading(false); // Stop loading indicator
        }
    };

    const handleSummarizeFile = async (file) => {
        setLoading(true); // Start loading indicator
        setError(null); // Reset error state

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
            setLoading(false); // Stop loading indicator
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
                </>
            )}
        </div>
    );
};

export default SummaryApp;