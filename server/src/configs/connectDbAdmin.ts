import { config } from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;
config()

const pool = new Pool();

export const connectToPg = async () => {
    const res =   await pool.connect();
    try {
        console.log('Connected to postgres');
    } catch (err) {
        console.error('Error connecting to DB', err);
    }finally{
        res.release()
    }
};

export default pool;
