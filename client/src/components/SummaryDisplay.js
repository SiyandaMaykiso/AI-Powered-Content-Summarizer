import React from 'react';

const SummaryDisplay = ({ summary }) => {
    return (
        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Summary</h2>
            {summary ? (
                <p style={{ fontSize: '1rem', lineHeight: '1.5', color: '#555' }}>{summary}</p>
            ) : (
                <p style={{ fontSize: '1rem', color: '#888', textAlign: 'center' }}>
                    No summary available yet. Please input content to summarize.
                </p>
            )}
        </div>
    );
};

export default SummaryDisplay;