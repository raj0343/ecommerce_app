import mongoose from "mongoose";

const connectDB= async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected ${conn.connection.host}`)
    } catch (error) {
        console.log(`ERROR in mongodb ${error}`)
    }
}


export default connectDB