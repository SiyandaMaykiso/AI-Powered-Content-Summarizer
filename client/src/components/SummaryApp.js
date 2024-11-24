import React, { useState } from 'react';
import SummaryInput from './SummaryInput';
import SummaryDisplay from './SummaryDisplay';

const SummaryApp = () => {
    const [summary, setSummary] = useState('');

    const handleSummarize = async (content) => {
        try {
            const response = await fetch('/api/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Use token for authentication
                },
                body: JSON.stringify({ content }),
            });

            if (response.ok) {
                const data = await response.json();
                setSummary(data.summary); // Update summary state
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