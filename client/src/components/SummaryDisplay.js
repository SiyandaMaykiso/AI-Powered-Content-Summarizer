import React from 'react';
import { useTheme } from '@mui/material/styles';

const SummaryDisplay = ({ summary }) => {
    const theme = useTheme(); 

    return (
        <div
            style={{
                marginTop: '20px',
                padding: '30px', 
                borderRadius: '8px',
                minHeight: '300px', 
                overflowY: 'auto', 
                maxHeight: '600px', 
                backgroundColor: theme.palette.background.paper, 
                color: theme.palette.text.primary, 
                border: `1px solid ${theme.palette.text.secondary}`, 
                boxShadow: theme.palette.mode === 'dark'
                    ? '0px 4px 10px rgba(0, 0, 0, 0.6)'
                    : '0px 4px 10px rgba(0, 0, 0, 0.1)', 
            }}
        >
            <h2
                style={{
                    textAlign: 'center',
                    color: theme.palette.text.primary, 
                }}
            >
                Summary
            </h2>
            {summary ? (
                <p
                    style={{
                        fontSize: '1.2rem', 
                        lineHeight: '1.8', 
                        color: theme.palette.text.primary, 
                        whiteSpace: 'pre-wrap', 
                    }}
                >
                    {summary}
                </p>
            ) : (
                <p
                    style={{
                        fontSize: '1rem',
                        color: theme.palette.text.secondary, 
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