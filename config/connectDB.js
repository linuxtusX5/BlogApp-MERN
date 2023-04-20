import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connection to Mongodb ${process.env.SC}`);
    } catch (error) {
        console.log(`Mongodb connection Error ${error}`)
    }
}
export default connectDB;