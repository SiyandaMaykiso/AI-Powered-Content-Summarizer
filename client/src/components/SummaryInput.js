import React, { useState } from 'react';

const SummaryInput = ({ onSummarizeText, onSummarizeFile }) => {
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const handleTextSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            setError('');
            onSummarizeText(content); // Call the onSummarizeText function passed as a prop
            setContent(''); // Clear the text input field
        } else {
            setError('Content cannot be empty.');
        }
    };

    const handleFileSubmit = (e) => {
        e.preventDefault();
        if (file) {
            setError('');
            onSummarizeFile(file); // Call the onSummarizeFile function passed as a prop
            setFile(null); // Clear the file input
        } else {
            setError('Please select a file to upload.');
        }
    };

    return (
        <div>
            {/* Text Summarization Form */}
            <form onSubmit={handleTextSubmit} style={{ marginBottom: '20px' }}>
                <textarea
                    placeholder="Enter content to summarize..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="5"
                    cols="50"
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '1rem',
                        marginBottom: '10px',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#1565c0',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Summarize Text
                </button>
            </form>

            {/* File Summarization Form */}
            <form onSubmit={handleFileSubmit}>
                <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ marginBottom: '10px' }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#1565c0',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Summarize File
                </button>
            </form>

            {/* Error Message */}
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
    );
};

export default SummaryInput;