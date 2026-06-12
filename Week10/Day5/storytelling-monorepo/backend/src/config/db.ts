import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Spin up a connection reuse pool leveraging environment strings
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log(' PostgreSQL database pool connected cleanly.');
});

pool.on('error', (err) => {
  console.error('Unexpected pool termination diagnostic:', err);
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
export default pool;