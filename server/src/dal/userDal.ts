import { AdminUser } from "../types/admin.js";
import bcrypt from 'bcrypt';
import RequestError from "../utils/RequestError.js";
import STATUS_CODES from "../utils/StatusCodes.js";
import pkg from 'pg';
const { Pool } = pkg;

const sendQueryToDatabase = async (query: string, values: any[]): Promise<any> => {
    const pool = new Pool()
    const res = await pool.connect()
    const data = await res.query(query, values).catch(err => console.log(err));
    res.release()
    return data
  }

const addUser = async (user: AdminUser) => {

    // Check if the user already exists
    const userExistsQuery = 'SELECT * FROM admin_users WHERE email = $1';
    const existingUser = await sendQueryToDatabase(userExistsQuery, [user.email]);

    if (existingUser.rows.length > 0) {
        throw new RequestError("User already exists", STATUS_CODES.CONFLICT);
    }

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
    const res = await sendQueryToDatabase(query, values);

    if (!res) {
        throw new RequestError("Error while adding user:", STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};

// login
const getUserByEmail = async (email: string) => {

    const query = `SELECT * FROM admin_users WHERE email = $1`;
    const result = await sendQueryToDatabase(query, [email]);
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
