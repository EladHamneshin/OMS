import { AdminUser } from "../types/admin";

const API_URL = 'http://localhost:3000/api/users';

export async function register(user: AdminUser) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},  
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

export async function login(user: AdminUser) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},  
        body: JSON.stringify(user)
      });
      
      if (!response.ok) {
        throw new Error(await response.text());
      }
      return response.json();
    } catch (error) {
      console.error('lo failed:', error);
      throw error;
    }
  }
  