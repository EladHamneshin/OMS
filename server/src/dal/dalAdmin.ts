import pool from '../configs/connectDbAdmin';

import { AdminUser } from "../types/admin";
import usersAdmin from "../models/usersAdmin"


const createUserAdmin = async (users: AdminUser[]) => {
    try {
        const query = `
            INSERT INTO admin_users (first_name, last_name, email, password)
            VALUES ($1, $2, $3, $4)
        `;

        for (const user of users) {
            const values = [
                user.firstName,
                user.lastName,
                user.email,
                user.password,
            ];

            const res = await pool.query(query, values);
            console.log('User admin inserted successfully:', user);
        }

        return "Users admin inserted successfully";
    } catch (error) {
        console.error('Error inserting user admin:', error);
        throw error;
    }
};

createUserAdmin(usersAdmin);
