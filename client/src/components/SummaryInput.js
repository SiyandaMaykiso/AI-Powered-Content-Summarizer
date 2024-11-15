import React, { useState } from 'react';

const SummaryInput = ({ onSummarize }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSummarize(content);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Enter content to summarize..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Summarize</button>
    </form>
  );
};

export default SummaryInput;