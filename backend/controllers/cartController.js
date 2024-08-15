import userModel from "../models/userModel.js";

//add items to to the usercart
const addToCart = async(req,res)=>{
    try{
        let userData = await userModel.findOne({_id : req.body.userId});
        let cart = await userData.cart
        if (!cart[req.body.itemId]){
            cart[req.body.itemId] = 1
        } else {
            cart[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cart})
        res.json({success : true, message : "Item added to cart"})
    } catch(error){
        console.log(error)
        res.json({success : false, message : "Error"})
    }
}

//remove items from the usercart
const removeFromCart = async(req,res)=>{
    try{
        let userData = await userModel.findOne({_id : req.body.userId});
        let cart = await userData.cart;
        if (cart[req.body.itemId] > 0){
            cart[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cart})
        res.json({success : true, message : "Item removed from the cart"})
    } catch(error){
        console.log(error);
        res.json({success : false, message : "Error"})
    }
}

//fetch user cart data
const getCart = async(req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cart = await userData.cart;
        res.json({success : true, cart})
    } catch(error){
        console.log(error);
        res.json({success : false, message : "Error"})
    }
} 

export {addToCart, removeFromCart, getCart}