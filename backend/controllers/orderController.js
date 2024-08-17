import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontendUrl = "https://food-del-73lz.onrender.com";

//placing user order for frontend
const placeOrder = async (req,res) =>{
    try {
        const newOrder = new orderModel({
            userId : req.body.userId,
            items : req.body.items,
            amount : req.body.amount,
            address : req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cart : {}} )

        const line_items = req.body.items.map((item)=>({
            price_data : {
                currency : "GBP",
                product_data : {
                    name :item.name
                },
                unit_amount : item.price * 100 * 0.8
            },
            quantity : item.quantity
        }))

        line_items.push({
            price_data : {
                currency : "GBP",
                product_data : {
                    name : "Delivery Fee"
                },
                unit_amount : 2*100*0.8
            },
            quantity : 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items : line_items,
            mode : "payment",
            success_url : `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({success : true, session_url : session.url})
    } catch(error){
        console.log(error)
        res.json({success : false, message : error.message})
    }
}

//verify payment
const verifyOrder = async (req,res) => {
    const {orderId, success} = req.body;
    try{
        if (success == "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment : true});
            res.json({success : true, message : "paid"});
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success : false, message : "Not Paid, payment unsuccessful"})
        }
    } catch(error){
        console.log(error);
        res.json({success : false, message : "Error in verifying the payment"})
    }
}

// getting user orders
const userOrders = async (req,res) => {
    try{
        const userOrdersData = await orderModel.find({userId : req.body.userId});
        res.json({success : true, userOrdersData})
    } catch(error){
        console.log(error);
        res.json({success : false, message : "Error in getting user orders"})
    }
}

//Listing orders for admin panel
const listingOrders = async(req,res) => {
    try {
        const allOrders = await orderModel.find();
        res.json({success : true, data : allOrders})
    } catch(error){
        console.log(error);
        res.json({success : false, message : "Error in listing orders for admin panel"})
    }
}

//api for updating order status
const upadteStatus = async (req,res) => {
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId, {status : req.body.status});
        res.json({success : true, message : "Status updated"})
    } catch(error){
        console.log(error);
        res.json({success : false, message : "Error in updating order status"}) 
    }
}

export {placeOrder, verifyOrder, userOrders, listingOrders, upadteStatus}