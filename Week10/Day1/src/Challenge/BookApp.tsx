import React, { useState } from 'react';
import { List } from './List';

// Define the precise Type structure for a Book
export interface Book {
  id: number;
  title: string;
  author: string;
}

const BookApp: React.FC = () => {
  // Initialize state with an array of Books
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien' },
    { id: 2, title: '1984', author: 'George Orwell' }
  ]);

  // Form input state management
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  const addBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    const newBook: Book = {
      id: Date.now(), // Generate unique ID
      title,
      author
    };

    setBooks(prevBooks => [...prevBooks, newBook]);
    setTitle('');
    setAuthor('');
  };

  return (
    <div style={{ border: '2px solid #4CAF50', padding: '20px', margin: '20px 0', borderRadius: '8px' }}>
      <h2> Book List App (Daily Challenge Generic Component)</h2>
      
      {/* Add Book Form */}
      <form onSubmit={addBook} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Book Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input 
          type="text" 
          placeholder="Author Name" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Add Book
        </button>
      </form>

      {/* Deploying the Generic List Component specifically for our 'Book' type */}
      <List 
        items={books} 
        renderItem={(book: Book) => (
          <div>
            <strong> {book.title}</strong> by <em>{book.author}</em>
          </div>
        )}
      />
    </div>
  );
};

export default BookApp;