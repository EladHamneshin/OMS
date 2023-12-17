import { gql } from "@apollo/client";


export const REGISTER = gql`
    mutation Register($input: RegisterInput) {
  register(input: $input) {
    email
    first_name
    last_name
    password
  }
}
    `
export const LOGIN = gql`
  mutation Login($input: LoginInput) {
  login(input: $input) {
    email
    first_name
    is_admin
    last_name
    password
    token
    user_id
  }
} `
export const DELETE_USER = gql`
  mutation deleteUser($input: DeleteInput) {
    deleteUser  (input: $input) {
    message
  }
} `

export const GET_ALL_USERS = gql`
query getAllUsers {
  getAllUsers {
    email
    first_name
    is_admin
    password
    last_name
    token
    user_id
  }
}
`


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
