import express from "express";
import orderController from "../controllers/orderController.js";
import { autoToken } from "../middlewares/token.js";



const ordersRoutes = express.Router();


ordersRoutes.post("/", orderController.addOrder);
ordersRoutes.get("/:userId", orderController.getOrdersByUserId);
ordersRoutes.get("/", orderController.getOrders);


ordersRoutes.put("/:orderId",autoToken, orderController.updateOrder);



export default ordersRoutes;
