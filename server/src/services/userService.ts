import RequestError from "../utils/RequestError.js";
import STATUS_CODES from "../utils/StatusCodes.js";
import { validate } from '../utils/validate.js';
import { AdminUser } from '../types/admin.js';
import { userDal } from '../dal/userDal.js'
import { UUID } from "crypto";

const register = async (userInput: AdminUser) => {
  console.log(userInput);

  // Validate email format
  validate.validateEmail(userInput.email);
  // hash password
  const hashedPassword = await validate.hashPassword(userInput.password);
  // Create user object    
  const newUser = {
    id: userInput.id,
    first_name: userInput.first_name,
    last_name: userInput.last_name,
    email: userInput.email,
    password: hashedPassword,
    isAdmin: userInput.isAdmin
  };
  // Register the user
  const addedUser = await userDal.addUser(newUser);
  return { message: "User registered successfully", user: addedUser };
};


const getUserByEmailService = async (email: string) => {
  const data = await userDal.getUserByEmail(email);
  if (data) return data
  throw new RequestError("error getting .service", STATUS_CODES.INTERNAL_SERVER_ERROR)
}

const getAllUsers = async () => {
  const data = await userDal.getAllUsers();
  if (data) return data
  throw new RequestError("error getting service", STATUS_CODES.INTERNAL_SERVER_ERROR)
}

const deleteUserById = async (user_id  : UUID) => {
  const res = await userDal.deleteUserById(user_id);
  if (res) return res
  throw new RequestError("error getting service", STATUS_CODES.INTERNAL_SERVER_ERROR)
}

const validatePasswordService = async (password: string, hashedPassword: string) => {
  const data = await userDal.validatePassword(password, hashedPassword);
  if (data) return data
  throw new RequestError("error validate Password .service", STATUS_CODES.UNAUTHORIZED)
}

const logout = async () => {
  try {
    await userDal.logoutDal();
  } catch (error) {
    throw new Error('Logout service failed:', error!);
  }
};

export const userService = {
  register,
  getUserByEmailService,
  getAllUsers,
  deleteUserById,
  validatePasswordService,
  logout
}