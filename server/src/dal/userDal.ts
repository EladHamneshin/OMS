import { AdminUser } from "../types/admin.js";
import bcrypt from 'bcrypt';
import RequestError from "../utils/RequestError.js";
import STATUS_CODES from "../utils/StatusCodes.js";
import { config } from "dotenv";
import pool from "../configs/connectDbAdmin.js"
config();


const sendQueryToDatabase = async (query: string, values?: any[]): Promise<any> => {
    const res = await pool.connect();
    try {
        const data = await res.query(query, values);
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        res.release();
    }
}



const addUser = async (user: AdminUser) => {

    // Check if the user already exists
    const userExistsQuery = `SELECT * FROM get_user_by_email($1)`;
    const existingUser = await sendQueryToDatabase(userExistsQuery, [user.email]);
    if (existingUser.rows.length > 0) {
        throw new RequestError("User already exists", STATUS_CODES.CONFLICT);
    }

    const values = [
        user.first_name,
        user.last_name,
        user.email,
        user.password,
        user.isAdmin = false
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

    const query = `SELECT * FROM get_user_by_email($1)`;
    const result = await sendQueryToDatabase(query, [email]);
    
    if (result.rows.length === 0) {
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


const deleteUser = async (id: string) => {
    const userExistsQuery = 'SELECT * FROM admin_users WHERE user_id = $1';
    const existingUser = await sendQueryToDatabase(userExistsQuery, [id]);

    if (existingUser.rows.length === 0) {
        throw new RequestError("User not found", STATUS_CODES.NOT_FOUND);
    }
    const deleteQuery = 'SELECT * FROM delete_user_by_id( $1)';
    await sendQueryToDatabase(deleteQuery, [id]);
    return `User with ID ${id} deleted successfully.`;
}



const getAllDal = async () => {
    const query = `SELECT * FROM admin_users`
    const result = await sendQueryToDatabase(query)
    if (!result) {
        throw new RequestError("Error while getting users:", STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
    return result.rows;
}

const deleteUserEmail = async (email: string) => {
    const userExistsQuery = `SELECT * FROM delete_user_by_email( $1)`;
    const existingUser = await sendQueryToDatabase(userExistsQuery, [email]);
    if (existingUser.rows.length === 0) {
        throw new RequestError("User not found", STATUS_CODES.NOT_FOUND);
    }
    const deleteQuery = 'DELETE FROM admin_users WHERE email = $1';
    await sendQueryToDatabase(deleteQuery, [email]);
    return `User with ID ${email} deleted successfully.`;
}

export const userDal = {
    addUser,
    getUserByEmail,
    validatePassword,
    deleteUser,
    getAllDal,
    deleteUserEmail
};
