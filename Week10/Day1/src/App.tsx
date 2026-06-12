import Greeting from './components/Greetings';
import Counter from './components/Counter';
import UserCard from './components/UserCard';
import UserList from './components/UserList';
import BookApp from './Challenge/BookApp';

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Developers Institute - Day 1 TypeScript Assignments</h1>
      
      <hr />
      
      <h2> Exercises XP</h2>
      
      {/* Exercise 2 */}
      <Greeting name="Elvis" messageCount={5} />
      
      {/* Exercise 3 */}
      <Counter />
      
      {/* Exercise 4 */}
      <UserCard name="Alice" age={25} role="Administrator" />
      <UserCard name="Bob" /> {/* Testing fallback default properties */}
      
      {/* Exercise 5 */}
      <UserList />

      <hr style={{ margin: '40px 0' }} />

      {/* Daily Challenge */}
      <BookApp />
    </div>
  );
}

export default App;
