import Express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DB from "./config/connectDB.js";
import UserRoutes from "./routes/UserRoutes.js";
import BlogRoutes from "./routes/BlogRoutes.js";

dotenv.config();

//mongodb connection
DB();

const app = Express();

//Middleware
app.use(cors({
    origin: ["http://localhost:3000",]
}));
app.use(Express.json());

//Routes
app.use('/api/v1/user', UserRoutes)
app.use('/api/v1/blog', BlogRoutes)

//Port
const PORT = process.env.PORT || 8080
//Listen
app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} Port ${PORT}`)
})