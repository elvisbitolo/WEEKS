import React, { useState } from 'react';

const Counter: React.FC = () => {
  // Explicitly typing the state variables
  const [count, setCount] = useState<number>(0);
  const [lastAction, setLastAction] = useState<string>('None');

  const handleIncrement = () => {
    setCount(prev => prev + 1);
    setLastAction('Increment');
  };

  const handleDecrement = () => {
    setCount(prev => prev - 1);
    setLastAction('Decrement');
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h2>Counter Component</h2>
      <h3>Count: {count}</h3>
      <p>Last Action: <strong>{lastAction}</strong></p>
      <button onClick={handleIncrement} style={{ marginRight: '5px' }}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
};

export default Counter;