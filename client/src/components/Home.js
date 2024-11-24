import React from 'react';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Welcome to the AI-Powered Content Summarizer!</h1>
            <p>Your one-stop solution for concise and clear text summarization.</p>
            <p>
                <a href="/register">Register</a> or <a href="/login">Login</a> to get started.
            </p>
        </div>
    );
};

export default Home;