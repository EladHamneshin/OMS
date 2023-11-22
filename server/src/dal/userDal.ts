import pool from '../configs/connectDbAdmin.js';
import { AdminUser } from "../types/admin.js";
import bcrypt from 'bcrypt';

const addUser = async (user: AdminUser) => {
    // Check if the user already exists
    const userExistsQuery = 'SELECT * FROM admin_users WHERE email = $1';
    const existingUser = await pool.query(userExistsQuery, [user.email]);

    if (existingUser.rows.length > 0) {
        throw new Error("User already exists");
    }

    // If the user doesn't exist, proceed with insertion
    const values = [
        user.first_name,
        user.last_name,
        user.email,
        user.password,
        user.isAdmin
    ];
<<<<<<< HEAD
    
    const query = `
            INSERT INTO admin_users (first_name, last_name, email, password, is_admin)
            VALUES ($1, $2, $3, $4, $5)
        `;
    const res = await pool.query(query, values);
    
    if(res) return "Users admin inserted successfully";
    // console.log('User admin inserted successfully:', user);
    throw new Error ("Data entry failed")
    
}
=======

    const insertQuery = `
        INSERT INTO admin_users (first_name, last_name, email, password, is_admin)
        VALUES ($1, $2, $3, $4, $5)
    `;

    const result = await pool.query(insertQuery, values);

    if (result.rowCount! > 0) {
        return "Admin user inserted successfully";
    } else {
        throw new Error("Data entry failed");
    }
};

>>>>>>> fa31e7b9d480b0d0683c52f0b904e14cbe64ade5


// login
const getUserByEmail = async (email: string) => {
    const query = `SELECT * FROM admin_users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows;
}


const validatePassword = async (password: string, hashedPassword: string) => {
    console.log("dal",hashedPassword,password);
    return await bcrypt.compare(password, hashedPassword);
}


export const userDal = {
    addUser,
    getUserByEmail,
    validatePassword
}