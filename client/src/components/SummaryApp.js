import React, { useState } from 'react';
import SummaryInput from './SummaryInput';
import SummaryDisplay from './SummaryDisplay';
import api from '../api'; // Import the API instance

const SummaryApp = () => {
    const [summary, setSummary] = useState('');

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

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>AI-Powered Content Summarizer</h1>
            <SummaryInput onSummarize={handleSummarize} />
            <SummaryDisplay summary={summary} />
        </div>
    );
};

export default SummaryApp;