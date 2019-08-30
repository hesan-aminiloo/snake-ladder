import React from 'react';

const Dice = ({ number, loading }) => {
  return(
    <div className={`dice dice-no-${number} ${loading ? 'dice-loading' : ''}`}></div>
  );
};

export default Dice;
