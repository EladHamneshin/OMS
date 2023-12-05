import asyncHandler from "express-async-handler";
import { Request, Response } from "express"
import { userService } from "../services/userService.js"
import { createToken } from "../middlewares/token.js"
import RequestError from "../utils/RequestError.js";
import STATUS_CODES from "../utils/StatusCodes.js";


const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const reg = await userService.register(req.body)
    if (!reg) {
        throw new RequestError("An error occurred", STATUS_CODES.INTERNAL_SERVER_ERROR)
    }
    res.status(STATUS_CODES.OK).json(reg)
})

const validateLogin = async (email: string, password: string) => {
    const user = await userService.getUserByEmailService(email);
    if (!user) {
        throw new RequestError("User not found", STATUS_CODES.UNAUTHORIZED);
    }
    const hash = user[0]
    const isPasswordValid = await userService.validatePasswordService(password, hash.password)
    if (!isPasswordValid) {
        throw new RequestError("Invalid password", STATUS_CODES.UNAUTHORIZED);
    }
    return user;
}

const loginController = asyncHandler(async (req: Request, res: Response) => {

    const { email, password } = req.body;
    //   validate
    const user = await validateLogin(email, password);
    if (!user) {
        throw new RequestError("An error occurred", STATUS_CODES.INTERNAL_SERVER_ERROR)
    }
    //   create token
    const userEmail = req.body.email;
    const userAdmin = user[0].is_admin

    const token = createToken(userEmail, userAdmin);
    res.cookie('token', token, { httpOnly: true });
    res.status(STATUS_CODES.OK).json({ token, user, message: "Login successful" });
})


const logoutController = async (req: Request, res: Response) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout failed:', error);
        res.status(500).json({ error: 'Internal server error . controller logout' });
    }
};

const allUsers = asyncHandler(async (req: Request, res: Response) => {

    const users = await userService.allUsers()
    if (!users) {
        throw new RequestError("An error occurred", STATUS_CODES.INTERNAL_SERVER_ERROR)

    }
    res.status(STATUS_CODES.OK).json({ message: 'gating all users successful',users })
}
)

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id
    if (!req.isAdmin) {
        throw new RequestError("Only admin can delete", STATUS_CODES.BAD_REQUEST)
    }
    const response = await userService.deleteUser(id)
    if (!response) {
        throw new RequestError("An error occurred", STATUS_CODES.INTERNAL_SERVER_ERROR)
    }
    res.status(STATUS_CODES.OK).json(response)
})

export const userController = {
    registerUser,
    loginController,
    logoutController,
    allUsers,
    deleteUser
}

