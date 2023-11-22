import bcrypt from 'bcrypt';
import { userService } from '../services/userService.js';

const validateEmail = (email: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
        throw new Error('Invalid Email');
    }
};

const hashPassword = async (password: any) => {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
};

const validateLogin = async (email: string, password: string) => {
    const user: any = await userService.getUserByEmailService(email);
    if (!user) {
        throw new Error("User not found");
    }
    const hash = user[0]
    const isPasswordValid = await userService.validatePasswordService(password, hash.password)
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    return user;
}

export const validate = {
    validateEmail,
    hashPassword,
    validateLogin
}