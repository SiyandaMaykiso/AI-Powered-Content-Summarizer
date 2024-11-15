import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SummaryInput from './components/SummaryInput';
import SummaryDisplay from './components/SummaryDisplay';
import RecommendationList from './components/RecommendationList';

const App = () => {
  const [summary, setSummary] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const handleSummarize = async (content) => {
    try {
      const response = await fetch('/api/summary', {
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
    <div className="App">
      <Header />
      <SummaryInput onSummarize={handleSummarize} />
      <SummaryDisplay summary={summary} />
      <RecommendationList recommendations={recommendations} />
    </div>
  );
};

export default App;