import pool from '../configs/connectDbAdmin.js';
import { AdminUser } from "../types/admin.js";
import bcrypt from 'bcrypt';
import RequestError from "../utils/RequestError.js";
import STATUS_CODES from "../utils/StatusCodes.js";


const addUser = async (user: AdminUser) => {

    // Check if the user already exists
    const userExistsQuery = 'SELECT * FROM admin_users WHERE email = $1';
    const existingUser = await pool.query(userExistsQuery, [user.email]);

    if (existingUser.rows.length > 0) {
        throw new RequestError("User already exists", STATUS_CODES.CONFLICT);
    }

    // If the user doesn't exist, proceed with insertion
    const values = [
        user.first_name,
        user.last_name,
        user.email,
        user.password,
        user.isAdmin
    ];

    const query = `INSERT INTO admin_users (first_name, last_name, email, password, is_admin)
            VALUES ($1, $2, $3, $4, $5)
        `;
    const res = await pool.query(query, values);

    if (!res) {
        throw new RequestError("Error while adding user:", STATUS_CODES.INTERNAL_SERVER_ERROR);
    }



};

// login
const getUserByEmail = async (email: string) => {

    const query = `SELECT * FROM admin_users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    if (!result) {
        throw new RequestError("Error while getting user by email:", STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
    return result.rows;
};

const validatePassword = async (password: string, hashedPassword: string) => {

    const bcryptPassword = await bcrypt.compare(password, hashedPassword);
    if (!bcryptPassword) {
        throw new RequestError("Error while validating password:", STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
    return bcryptPassword

};

const logoutDal = async () => {
    try {
      // Implement your logout operations here (e.g., session invalidation, etc.)
      // This function might interact with your database to update user records, etc.
    } catch (error) {
      throw new Error('Logout DAL failed:', error!);
    }
  };
export const userDal = {
    addUser,
    getUserByEmail,
    validatePassword,
    logoutDal
};
