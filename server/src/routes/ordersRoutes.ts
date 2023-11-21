import express from "express";
import orderController from "../controllers/orderController.js";



const ordersRoutes = express.Router();

ordersRoutes.post("/", orderController.addOrder);
ordersRoutes.get("/:userId", orderController.getOrdersByUserId);
ordersRoutes.get("/", orderController.getOrders);



export default ordersRoutes;
