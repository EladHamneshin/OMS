// import pgPromise from 'pg-promise';
// import client from './connectDbAdmin';
// const pgp = pgPromise();
// const defaultConnectionString = 'postgres://postgres:0528302qw@localhost:5432/';
// const db = pgp(defaultConnectionString);

// async function createDatabaseAndTable() {
//     try {
//         // Connect to the default database (postgres)
//         // await db.none('CREATE DATABASE projOms');

//         // Connect to the projOms database
//         // const projOmsDB = pgp('postgres://postgres:0528302qw@localhost:5432/projOms');

//         // Create a table in the projOms database
//         await client.query(`
//             CREATE TABLE IF NOT EXISTS admin_users (
//                 id SERIAL PRIMARY KEY, 
//                 first_name VARCHAR(50) NOT NULL,
//                 last_name VARCHAR(50) NOT NULL, 
//                 email VARCHAR(100) UNIQUE NOT NULL,
//                 password VARCHAR(255) NOT NULL,
//                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//             )
//         `);

//         console.log('Database and table created successfully!');
//     } catch (error) {
//         console.error('Error creating database and table:', error);
//     } finally {
//         pgp.end();
//     }
// }

// // Run the function
// createDatabaseAndTable();
