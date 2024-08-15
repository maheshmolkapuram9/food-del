import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://mahhii1999:Mahesh99@cluster0.3jjb2wm.mongodb.net/food-del")
        .then(()=>{console.log("DB Connected")})
}