import express from "express";
import orderController from "../controllers/orderController";


const ordersRoutes = express.Router();

ordersRoutes.post("/", orderController.addOrder);
ordersRoutes.get("/:userId", orderController.getOrders);



export default ordersRoutes;
