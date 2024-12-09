import React from 'react';
import { useTheme } from '@mui/material/styles';

const SummaryDisplay = ({ summary }) => {
    const theme = useTheme(); // Access the current theme

    return (
        <div
            style={{
                marginTop: '20px',
                padding: '30px', // Increase padding for better spacing
                borderRadius: '8px',
                minHeight: '300px', // Ensure a minimum height for large content
                overflowY: 'auto', // Add vertical scrolling for long summaries
                maxHeight: '600px', // Optional: Limit the maximum height
                backgroundColor: theme.palette.background.paper, // Dynamic background color
                color: theme.palette.text.primary, // Dynamic text color
                border: `1px solid ${theme.palette.text.secondary}`, // Subtle border styling
                boxShadow: theme.palette.mode === 'dark'
                    ? '0px 4px 10px rgba(0, 0, 0, 0.6)'
                    : '0px 4px 10px rgba(0, 0, 0, 0.1)', // Conditional shadow for depth
            }}
        >
            <h2
                style={{
                    textAlign: 'center',
                    color: theme.palette.text.primary, // Dynamic heading color
                }}
            >
                Summary
            </h2>
            {summary ? (
                <p
                    style={{
                        fontSize: '1.2rem', // Slightly larger font for clarity
                        lineHeight: '1.8', // More space between lines
                        color: theme.palette.text.primary, // Dynamic paragraph color
                        whiteSpace: 'pre-wrap', // Preserve whitespace and line breaks
                    }}
                >
                    {summary}
                </p>
            ) : (
                <p
                    style={{
                        fontSize: '1rem',
                        color: theme.palette.text.secondary, // Dynamic placeholder color
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