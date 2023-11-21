import bcrypt from 'bcrypt';

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

export const validate = {
    validateEmail,
    hashPassword
}