import express from "express";

import userController from "../controllers/userController";
import orderController from "../controllers/orderController";



const ordersRoutes = express.Router();

ordersRoutes.post("/", orderController.addOrder);
ordersRoutes.get("/:userId", orderController.getOrdersByUserId);
ordersRoutes.get("/", orderController.getOrders);



export default ordersRoutes;
