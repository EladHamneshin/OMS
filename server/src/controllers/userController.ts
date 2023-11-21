import { Request, Response } from "express"
import { userService } from "../services/userService.js"
import { createToken } from "../middlewares/token.js"

const registerUser = async (req: Request, res: Response) => {

    try {
        const reg = await userService.register(req.body)
        console.log(req.body);

        res.status(200).json(reg)
    } catch (err) {
        console.error(err);
        res.status(400).send(`${err}`);
    }
}

const validateLogin = async (email: string, password: string) => {
    const user:any = await userService.getUserByEmailService(email);
    if (!user) {
        throw { error: "User not found" };
    }
    const isPasswordValid = await userService.validatePasswordService(password, user.password);
    if (!isPasswordValid) {
        throw { error: "Invalid password" };
    }
    return user;
}

const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        //   validate
        const user:any = await validateLogin(email, password);
        console.log("userr",user);
        
        //   create token
        const userEmail = req.body.email;
        const token = createToken(userEmail);
        return res.status(200).json({ token, user, message: "Login successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
// const loginController = async (req: Request, res: Response) => {
//     try {
//         const { email, password } = req.body;

//         const user = await userService.getUserByEmailService(email);
//         if (!user) {
//             return res.status(401).json({ error: "Login failed not found user" });
//         }
//         const isPasswordValid = await userService.validatePasswordService(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ error: "Login failed not match password" });
//         }
//         const userEmail = req.body.email;
//         const accessToken = createToken(userEmail);
//         return res.status(200).json({ accessToken, message: "Login successful", user });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// };


export const userController = {
    registerUser,
    loginController
}