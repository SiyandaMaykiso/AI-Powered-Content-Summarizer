import React, { useState } from 'react';
import SummaryInput from './SummaryInput';
import SummaryDisplay from './SummaryDisplay';
import api from '../api'; // Import the API instance

const SummaryApp = () => {
    const [summary, setSummary] = useState('');

    // Function to handle text summarization
    const handleSummarize = async (content) => {
        try {
            const response = await api.post('/summarize', { content }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Use token for authentication
                },
            });

            if (response.status === 200) {
                setSummary(response.data.summary); // Update summary state
            } else {
                console.error('Failed to fetch summary');
            }
        } catch (error) {
            console.error('Error summarizing content:', error.message);
        }
    };

    // Function to handle file summarization
    const handleSummarizeFile = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await api.post('/summarize/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Use token for authentication
                },
            });

            if (response.status === 200) {
                setSummary(response.data.summary); // Update summary state
            } else {
                console.error('Failed to summarize file');
            }
        } catch (error) {
            console.error('Error summarizing file content:', error.message);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>AI-Powered Content Summarizer</h1>
            <SummaryInput onSummarize={handleSummarize} onSummarizeFile={handleSummarizeFile} />
            <SummaryDisplay summary={summary} />
        </div>
    );
};

export default SummaryApp;