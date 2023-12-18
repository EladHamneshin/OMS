import { config } from 'dotenv'; 
import { PoolClient } from 'pg';
import pkg from 'pg';
const { Pool } = pkg;
import { validate } from '../utils/validate.js';
config();
const connect = {
    user: process.env.PGUSER!,
    password: process.env.PGPASSWORD!,
    host: process.env.PGHOST!,
    port: Number(process.env.PGPORT!),
    database: process.env.PGDATABASE,
}
const pool = new Pool(connect);

export const connectToPg = async () => {
    try {

        const client: PoolClient = await pool.connect();
        console.log('Connected to postgres');
        await defaultAdminUsers(client);
    } catch (err) {
        console.error('Error connecting to DB', err);
    } finally {
         pool.end();
    }
};

async function defaultAdminUsers(client: PoolClient) {
    const isAdmin = true;
    const hashedPassword = await validate.hashPassword('string');
    const users = [
        {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@example.com',
            password: hashedPassword,
            is_admin: isAdmin,
        },
        {
            first_name: 'Jane',
            last_name: 'Doe',
            email: 'jane@example.com',
            password: hashedPassword,
            is_admin: isAdmin,
        },
    ];

    for (const user of users) {
        await client.query(
            `INSERT INTO admin_users (first_name, last_name, email, password, is_admin)
             VALUES ($1, $2, $3, $4, $5)`,
            [
                user.first_name,
                user.last_name,
                user.email,
                user.password,
                user.is_admin,
            ]
        );
    }

    console.log('Admin users added successfully');
}

export default pool;
