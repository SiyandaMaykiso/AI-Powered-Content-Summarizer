import React from 'react';
import Login from './Login';
import Register from './Register';

const Home = ({ onLogin }) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Welcome to the AI-Powered Content Summarizer!</h1>
            <p>Your one-stop solution for concise and clear text summarization.</p>

            {/* Container for Forms */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    gap: '50px',
                    marginTop: '30px',
                }}
            >
                {/* Login Form */}
                <div style={{ width: '300px', border: '1px solid #ddd', padding: '20px', borderRadius: '10px' }}>
                    <h2>Login</h2>
                    <Login onLogin={onLogin} /> {/* Pass onLogin */}
                </div>

                {/* Register Form */}
                <div style={{ width: '300px', border: '1px solid #ddd', padding: '20px', borderRadius: '10px' }}>
                    <h2>Register</h2>
                    <Register /> {/* No onRegister needed */}
                </div>
            </div>
        </div>
    );
};

export default Home;