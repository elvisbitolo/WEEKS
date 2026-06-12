import React, { useState, useEffect } from 'react';

// Structuring the data structure expected from the API
interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch user data.');
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs once when mounted

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h2>User Directory</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} style={{ marginBottom: '10px' }}>
            <strong>{user.name}</strong> ({user.email}) <br />
            <small>Company: {user.company.name}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;