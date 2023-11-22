import { AdminUser } from "../types/admin";
const API_URL = 'http://localhost:3000/api/users';
export async function register(user:AdminUser) {
    const config = {
        method: 'POST',
        url: `${API_URL}/register`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    };
    try {
        const response = await fetch(config.url, config);
        if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Registration failed:', errorMessage);
            throw new Error(errorMessage);
        }
        const data = await response.json();
        console.log(data);
        return response;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}