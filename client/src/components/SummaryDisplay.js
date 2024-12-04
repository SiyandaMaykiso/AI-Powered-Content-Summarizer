import React from 'react';

const SummaryDisplay = ({ summary }) => {
    return (
        <div
            style={{
                marginTop: '20px',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9', // Light background for better contrast
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for an elevated look
            }}
        >
            <h2 style={{ textAlign: 'center', color: '#1565c0', marginBottom: '15px' }}>Summary</h2>
            {summary ? (
                <p
                    style={{
                        fontSize: '1rem',
                        lineHeight: '1.6',
                        color: '#333',
                        whiteSpace: 'pre-wrap', // Handles multiline text
                        wordWrap: 'break-word', // Breaks long words or URLs
                        textAlign: 'justify', // Improves readability for longer text
                    }}
                >
                    {summary}
                </p>
            ) : (
                <p style={{ fontSize: '1rem', color: '#888', textAlign: 'center' }}>
                    No summary available yet. Please input content to summarize.
                </p>
            )}
        </div>
    );
};

export default SummaryDisplay;