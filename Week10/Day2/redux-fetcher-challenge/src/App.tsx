import { useState } from 'react';
import { DataFetcher } from './components/DataFetcher';
import type { User, Post } from './types/types';

function App() {
  const [targetType, setTargetType] = useState<'users' | 'posts'>('users');

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', fontFamily: 'system-ui, sans-serif' }}>
      <h2>Daily Challenge: Generic Data Fetcher (React + Redux + TS)</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setTargetType('users')} 
          style={{ marginRight: '10px', padding: '8px 12px', fontWeight: targetType === 'users' ? 'bold' : 'normal' }}
        >
          Fetch Users List
        </button>
        <button 
          onClick={() => setTargetType('posts')}
          style={{ padding: '8px 12px', fontWeight: targetType === 'posts' ? 'bold' : 'normal' }}
        >
          Fetch Posts List
        </button>
      </div>

      {targetType === 'users' ? (
        <div>
          <h3> User Data View</h3>
          <DataFetcher<User> 
            url="https://jsonplaceholder.typicode.com/users"
            renderItem={(user) => (
              <div>
                <strong>{user.name}</strong> — <small>@{user.username}</small> <br />
                <span> {user.email}</span>
              </div>
            )}
          />
        </div>
      ) : (
        <div>
          <h3> Posts Data View</h3>
          <DataFetcher<Post> 
            url="https://jsonplaceholder.typicode.com/posts?_limit=5"
            renderItem={(post) => (
              <div>
                <strong> {post.title}</strong>
                <p style={{ margin: '4px 0 0 0', color: '#555' }}>{post.body}</p>
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
}

export default App;