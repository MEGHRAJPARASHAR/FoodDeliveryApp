import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("db connect")
    } catch (error) {
        console.log("DB ERROR \n",error)
    }
}
export default connectDB;