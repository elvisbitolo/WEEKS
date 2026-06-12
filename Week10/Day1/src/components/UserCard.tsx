import React from 'react';

// Using '?' to mark properties as optional
interface UserCardProps {
  name?: string;
  age?: number;
  role?: string;
}

// Providing default values directly in the destructuring assignment
const UserCard: React.FC<UserCardProps> = ({ 
  name = 'Guest User', 
  age = 18, 
  role = 'Viewer' 
}) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
      <h3>User Profile</h3>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Age:</strong> {age}</p>
      <p><strong>Role:</strong> {role}</p>
    </div>
  );
};

export default UserCard;