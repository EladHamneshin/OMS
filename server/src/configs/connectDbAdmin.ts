import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({connectionString:process.env.PG_URI});

export const connectToPg = async () => {
    try {
        await pool.connect();
        console.log('Connected to postgres');
    } catch (err) {
        console.error('Error connecting to DB', err);
    }
};

export default pool;
