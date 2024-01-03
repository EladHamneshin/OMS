import asyncHandler from "express-async-handler";
import { Request, Response } from "express"
import { userService } from "../services/userService.js"
import { createToken } from "../middlewares/token.js"
import RequestError from "../utils/RequestError.js";
import STATUS_CODES from "../utils/StatusCodes.js";
import { client } from "../configs/connectRedis.js";
import { promises } from "dns";
import { error } from "console";


// const registerUser = asyncHandler(async (req: Request, res: Response) => {
//     const reg = await userService.register(req.body)
//     if (!reg) {
//         throw new RequestError("An error occurred", STATUS_CODES.INTERNAL_SERVER_ERROR)
//     }
//     res.status(STATUS_CODES.OK).json(reg)
// })

export const validateLogin = async (email: string, password: string) => {
// redis
  const myPromise = new Promise(async (resolve, reject) => {
    const user = await client.get(`user:${email}`);
    if (!user) reject(77);
    else resolve(user);
  });
  // DB
  const userPg = userService.getUserByEmailService(email);

  const promises = [myPromise,userPg]
    let user = await Promise.any(promises)
    console.log(user[0]);
  
  if (!user[0]) {
    throw new RequestError("User not found", STATUS_CODES.UNAUTHORIZED);
  }
  if (!user[0].user_id){  
    user = JSON.parse(user);
  }

  const isPasswordValid = await userService.validatePasswordService(password, user[0].password)
  if (!isPasswordValid) {
    throw new RequestError("Invalid password", STATUS_CODES.UNAUTHORIZED);
  }
  
  return user;
}

// const loginController = asyncHandler(async (req: Request, res: Response) => {    
//     const { email, password } = req.body;
//     //   validate
//     const user = await validateLogin(email, password);
//     if (!user) {
//         throw new RequestError("An error occurred", STATUS_CODES.INTERNAL_SERVER_ERROR)
//     }
//     //   create token
//     const userEmail = req.body.email;
//     const userAdmin = user[0].is_admin

//     const token = createToken(userEmail, userAdmin);
//     res.setHeader('Authorization',token);

//     res.status(STATUS_CODES.OK).json({ user, message: "Login successful" });
// })


// const logoutController = async (req: Request, res: Response) => {
//     try {
//         res.clearCookie('token');
//         res.status(200).json({ message: 'Logout successful' });
//     } catch (error) {
//         console.error('Logout failed:', error);
//         res.status(500).json({ error: 'Internal server error . controller logout' });
//     }
// };

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
  // registerUser,
  // loginController,
  // logoutController,
  deleteUser
}

//  [{"first_name":"e","last_name":"asdf","email":"asdsasdsasa@lkjh.com","password":"$2b$10$XqKvwia9xSHUNuk.e2u2iOhgE2LlPYMjJyvaGAV563xpXyqxA.A5m","isAdmin":false}]

//  [
//       {
//         user_id: '1a5e8b27-ff81-4c8c-8a0a-f3c90eaae2d6',
//         first_name: 'e',
//         last_name: 'asdf',
//         email: 'asdsasdsasa@lkjh.com',
//         password: '$2b$10$XqKvwia9xSHUNuk.e2u2iOhgE2LlPYMjJyvaGAV563xpXyqxA.A5m',
//         is_admin: false,
//         created_at: 2023-12-19T11:31:24.369Z
//       }
//     ]