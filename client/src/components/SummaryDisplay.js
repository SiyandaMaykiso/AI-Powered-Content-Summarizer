import React from 'react';

const SummaryDisplay = ({ summary }) => {
    return (
        <div
            style={{
                marginTop: '20px',
                padding: '30px', // Increase padding for better spacing
                border: '1px solid #ccc',
                borderRadius: '8px',
                minHeight: '300px', // Ensure a minimum height for large content
                overflowY: 'auto', // Add vertical scrolling for long summaries
                maxHeight: '600px', // Optional: Limit the maximum height
                backgroundColor: '#f9f9f9', // Light background for readability
            }}
        >
            <h2 style={{ textAlign: 'center', color: '#333' }}>Summary</h2>
            {summary ? (
                <p
                    style={{
                        fontSize: '1.2rem', // Slightly larger font for clarity
                        lineHeight: '1.8', // More space between lines
                        color: '#555',
                        whiteSpace: 'pre-wrap', // Preserve whitespace and line breaks
                    }}
                >
                    {summary}
                </p>
            ) : (
                <p
                    style={{
                        fontSize: '1rem',
                        color: '#888',
                        textAlign: 'center',
                    }}
                >
                    No summary available yet. Please input content to summarize.
                </p>
            )}
        </div>
    );
};

export default SummaryDisplay;