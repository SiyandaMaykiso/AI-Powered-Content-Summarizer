import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SummaryInput from './components/SummaryInput';
import SummaryDisplay from './components/SummaryDisplay';
import RecommendationList from './components/RecommendationList';
import SummaryHistory from './components/SummaryHistory';

const App = () => {
    const [summary, setSummary] = useState('');
    const [recommendations, setRecommendations] = useState([]);

    const handleSummarize = async (content) => {
        try {
            const response = await fetch('/api/summarize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content }),
            });
            const data = await response.json();
            setSummary(data.summary);
            setRecommendations(data.recommendations || []);
        } catch (error) {
            console.error('Error summarizing content:', error);
        }
    };

    return (
        <Router>
            <div className="App">
                <Header />
                {/* Navigation Links */}
                <nav style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <Link to="/" style={{ marginRight: '15px', textDecoration: 'none', color: '#1565c0' }}>
                        Home
                    </Link>
                    <Link to="/history" style={{ textDecoration: 'none', color: '#1565c0' }}>
                        View History
                    </Link>
                </nav>
                {/* Routes */}
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <SummaryInput onSummarize={handleSummarize} />
                                <SummaryDisplay summary={summary} />
                                <RecommendationList recommendations={recommendations} />
                            </>
                        }
                    />
                    <Route path="/history" element={<SummaryHistory />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;