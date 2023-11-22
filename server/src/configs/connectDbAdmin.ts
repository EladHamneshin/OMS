import pkg from 'pg';
const { Pool } = pkg;


export const connectToPg = async () => {
    const pool =await new Pool();
    try {
        await pool.connect();
        console.log('Connected to postgres');
    } catch (err) {
        console.error('Error connecting to DB', err);
    }
};

export default pool;
