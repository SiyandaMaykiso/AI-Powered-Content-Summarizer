import React from 'react';

const RecommendationList = ({ recommendations }) => {
  return (
    <div>
      <h2>Recommendations</h2>
      <ul>
        {recommendations.length > 0 ? (
          recommendations.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <li>No recommendations available.</li>
        )}
      </ul>
    </div>
  );
};

export default RecommendationList;