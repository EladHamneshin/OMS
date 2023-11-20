import express from "express";
import userController from "../controllers/userController";


const userRouter = express.Router();


userRouter.get("/", userController.getUser);
userRouter.post("/register", userController.registerUser);

export default userRouter;
