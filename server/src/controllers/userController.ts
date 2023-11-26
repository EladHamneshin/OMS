import asyncHandler from "express-async-handler";
import { Request, Response } from "express"
import { userService } from "../services/userService.js"
import { createToken } from "../middlewares/token.js"


const registerUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        const reg = await userService.register(req.body)
        res.status(200).json(reg)
    } catch (err) {
        console.error(err);
        res.status(400).send(`${err}`);
    }
}
)


const validateLogin = async (email: string, password: string) => {
    const user = await userService.getUserByEmailService(email);

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

const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        //   validate
        const user = await validateLogin(email, password);
        //   create token
        const userEmail = req.body.email;

        const userAdmin = user[0].is_admin

        const token = createToken(userEmail, userAdmin);
        res.cookie('token', token, { httpOnly: true });
        // res.cookie('isAdmin', userAdmin);
        // console.log(userAdmin);

        return res.status(200).json({ token, user, message: "Login successful" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

const logoutController = async (req: Request, res: Response) => {
    try {
        await userService.logout();
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout failed:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const userController = {
    registerUser,
    loginController,
    logoutController
}

