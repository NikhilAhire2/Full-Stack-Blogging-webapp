import mongoose, { connect } from "mongoose";
const connectDB=async()=>{{
    try {
       await mongoose.connect(process.env.MONGODB_URL);
       console.log("Mongodb is successfully connected");
       
        
    } catch (error) {
        console.log("MONGODB is not connected",error);
        
    }
}}
export default connectDB;