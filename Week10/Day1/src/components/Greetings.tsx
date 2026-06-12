import React from 'react';

// Defining the interface for props
interface GreetingProps {
  name: string;
  messageCount: number;
}

const Greeting: React.FC<GreetingProps> = ({ name, messageCount }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h2>Hello, {name}!</h2>
      <p>You have {messageCount} unread messages.</p>
    </div>
  );
};

export default Greeting;