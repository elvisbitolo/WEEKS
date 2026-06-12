import { query } from './config/db';

const initDb = async () => {
  try {
    // Create the collaborative stories table schema structure
    await query(`
      CREATE TABLE IF NOT EXISTS stories (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        "authorId" VARCHAR(255) DEFAULT 'current-user-id'
      );
    `);
    console.log(' Cloud database tables successfully provisioned onto Render!');
    process.exit(0);
  } catch (err) {
    console.error('Database migration error:', err);
    process.exit(1);
  }
};

initDb();