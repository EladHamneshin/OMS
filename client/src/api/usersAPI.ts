import { AdminUser } from "../types/admin";
import { User } from "../types/userAdmin";

const URL = import.meta.env.VITE_API_URI

export async function register(user: AdminUser) {
    try {
        const response = await fetch(`${URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }
        return response.json();
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
}

export async function login(user: Partial<AdminUser>): Promise<User> {
    try {
        const response = await fetch(`${URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }
        const res = await response.json();
        const adminResponse = res.user[0];

        const token = response.headers.get('Authorization');
        localStorage.setItem('omsToken', token!);

        return adminResponse;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

export async function logOutApi() {
    try {
        const response = await fetch(`${URL}/users/logout`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })
        if (!response.ok) {
            throw new Error(await response.text());
        }
        const res = await response.json();
        return res
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

export async function getAllUsers() {
    try {
        const response = await fetch(`${URL}/users`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return response.json();

    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
}

export async function deleteUsers(id: string) {
    try {
        const token = localStorage.getItem('omsToken');

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (token !== null) {
            headers['token'] = token;
        }
        const response = await fetch(`${URL}/users/${id}`, {
            method: 'DELETE',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return response.json();
    } catch (error) {
        console.error('Deletion failed:', error);
        throw error;
    }
}
