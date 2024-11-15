import React from 'react';

const SummaryDisplay = ({ summary }) => {
  return (
    <div>
      <h2>Summary</h2>
      <p>{summary || 'No summary available yet.'}</p>
    </div>
  );
};

export default SummaryDisplay;