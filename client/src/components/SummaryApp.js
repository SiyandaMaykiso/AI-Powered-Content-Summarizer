import React, { useState } from 'react';
import SummaryInput from './SummaryInput';
import SummaryDisplay from './SummaryDisplay';
import api from '../api'; // Ensure correct API instance import

const SummaryApp = () => {
    const [summary, setSummary] = useState('');

    const handleSummarizeText = async (content) => {
        try {
            // Log content to be summarized
            console.log('Sending request to /summarize with content:', content);

            // Send API request for text summarization
            const response = await api.post('/summarize', { content }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include token if needed
                },
            });

            // Log the API response
            console.log('API Response:', response.data);

            // Update state with the summary
            if (response.status === 200) {
                setSummary(response.data.summary);
            } else {
                console.error('Failed to fetch summary');
            }
        } catch (error) {
            console.error('Error summarizing content:', error.message);
        }
    };

    const handleSummarizeFile = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            // Log file upload information
            console.log('Sending file request to /summarize/file with file:', file.name);

            // Send API request for file summarization
            const response = await api.post('/summarize/file', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Log the API response
            console.log('API Response:', response.data);

            // Update state with the summary
            if (response.status === 200) {
                setSummary(response.data.summary);
            } else {
                console.error('Failed to fetch file summary');
            }
        } catch (error) {
            console.error('Error summarizing file:', error.message);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>AI-Powered Content Summarizer</h1>
            <SummaryInput
                onSummarizeText={handleSummarizeText}
                onSummarizeFile={handleSummarizeFile}
            />
            <SummaryDisplay summary={summary} />
        </div>
    );
};

export default SummaryApp;