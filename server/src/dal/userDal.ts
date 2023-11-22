import pool from '../configs/connectDbAdmin.js';
import { AdminUser } from "../types/admin.js";
import bcrypt from 'bcrypt';

const addUser = async (user: AdminUser): Promise<string> => {
    try {
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

        const query = `
            INSERT INTO admin_users (first_name, last_name, email, password, is_admin)
            VALUES ($1, $2, $3, $4, $5)
        `;
        const res = await pool.query(query, values);

        if (Array.isArray(res.rows) && res.rows.length > 0) {
            return "Admin user inserted successfully";
        } else {
            throw new Error("Data entry failed");
        }
    } catch (error) {
        throw new Error(`Error while adding user: ${error}`);
    }
};

// login
const getUserByEmail = async (email: string) => {
    try {
        const query = `SELECT * FROM admin_users WHERE email = $1`;
        const result = await pool.query(query, [email]);
        return result.rows;
    } catch (error) {
        throw new Error(`Error while getting user by email: ${error}`);
    }
};

const validatePassword = async (password: string, hashedPassword: string) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error(`Error while validating password: ${error}`);
    }
};

export const userDal = {
    addUser,
    getUserByEmail,
    validatePassword
};
