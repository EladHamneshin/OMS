import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: "postgres",
    database: "omsproj",
    host: "localhost",
    password: "0528302qw",
    port: 5432,
});

export const connectToPg = async () => {
    try {
        await pool.connect();
        console.log('Connected to postgres');
    } catch (err) {
        console.error('Error connecting to DB', err);
    }
};

export default pool;
