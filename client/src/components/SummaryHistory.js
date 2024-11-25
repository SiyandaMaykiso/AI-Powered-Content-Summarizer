import React, { useEffect, useState } from 'react';
import api from '../api';

const SummaryHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await api.get('/summaryhistory', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the token for authentication
                    },
                });
                setHistory(response.data.summaryHistory); // Set the fetched history
            } catch (err) {
                setError('Failed to fetch summary history.');
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) return <p>Loading summary history...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Summary History</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {history.length > 0 ? (
                    history.map((item) => (
                        <li key={item.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
                            <strong>Original Content:</strong>
                            <p>{item.content}</p>
                            <strong>Summary:</strong>
                            <p>{item.summary}</p>
                            <small>
                                <em>Created At: {new Date(item.createdAt).toLocaleString()}</em>
                            </small>
                        </li>
                    ))
                ) : (
                    <p>No summaries available yet.</p>
                )}
            </ul>
        </div>
    );
};

export default SummaryHistory;