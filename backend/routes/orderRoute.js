import express from "express";
import { listingOrders, placeOrder, upadteStatus, userOrders, verifyOrder } from "../controllers/orderController.js";
import authMiddleWare from "../middleware/auth.js";

const orderRouter = express.Router();

//placing user order for frontend
orderRouter.post("/place", authMiddleWare, placeOrder);

// verifying payment
orderRouter.post("/verify", verifyOrder);

// getting user orders
orderRouter.post("/userorders",authMiddleWare, userOrders);

//listing orders for admin panel
orderRouter.get("/listingorders", listingOrders);

//api for updating order status
orderRouter.post("/status", upadteStatus);

export default orderRouter;