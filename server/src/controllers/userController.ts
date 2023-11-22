import { Request, Response } from "express"
import { userService } from "../services/userService.js"
import { createToken } from "../middlewares/token.js"
import { validate } from "../utils/validate.js"

const registerUser = async (req: Request, res: Response) => {

    try {
        const reg = await userService.register(req.body)
        // console.log(req.body);
        res.status(200).json(reg)
    } catch (err) {
        console.error(err);
        res.status(400).send(`${err}`);
    }
}


const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        //   validate
        const user: any = await validate.validateLogin(email, password);

        //   create token
        const userEmail = req.body.email;
        const userAdmin = req.body.isAdmin
        const token = createToken(userEmail,userAdmin);
        return res.status(200).json({ token, user, message: "Login successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const userController = {
    registerUser,
    loginController
}


