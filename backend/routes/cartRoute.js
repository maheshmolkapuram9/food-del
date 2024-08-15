import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
import authMiddleWare from "../middleware/auth.js";

const cartRouter = express.Router();

//add items to user cart
cartRouter.post("/add", authMiddleWare, addToCart);

//remove items from user cart
cartRouter.post("/remove", authMiddleWare, removeFromCart);

//get items from user cart
cartRouter.post("/get", authMiddleWare, getCart);

export default cartRouter;