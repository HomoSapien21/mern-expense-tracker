import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongoose connection successful");
    }
    catch(err){
        console.log("Mongoose connection error",err);
    }
}

export default connectDB;