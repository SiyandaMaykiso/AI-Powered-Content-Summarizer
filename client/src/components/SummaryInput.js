import React, { useState } from 'react';

const SummaryInput = ({ onSummarize }) => {
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            setError('');
            onSummarize(content); // Pass the content to the parent component for API call
            setContent(''); // Clear the input field after submission
        } else {
            setError('Content cannot be empty');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Enter content to summarize..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="5"
                    cols="50"
                    style={{ width: '100%', padding: '10px', fontSize: '1rem' }}
                />
                <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>
                    Summarize
                </button>
            </form>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
    );
};

export default SummaryInput;