import pool from '../configs/connectDbAdmin.js';
import { AdminUser } from "../types/admin.js";
import bcrypt from 'bcrypt';

const addUser = async (user: AdminUser) => {

    const values = [
        user.first_name,
        user.last_name,
        user.email,
        user.password,
        user.isAdmin
    ];
    // console.log(user);
    
    const query = `
            INSERT INTO admin_users (first_name, last_name, email, password, is_admin)
            VALUES ($1, $2, $3, $4, $5)
        `;
    const res = await pool.query(query, values);
    console.log(res);
    
    if(res) return "Users admin inserted successfully";
    // console.log('User admin inserted successfully:', user);
    throw new Error ("Data entry failed")
    
}


// login
const getUserByEmail = async (email: string) => {
    const query = `SELECT * FROM admin_users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows;
}


const validatePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
}


export const userDal = {
    addUser,
    getUserByEmail,
    validatePassword
}