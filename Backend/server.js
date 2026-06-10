import dotenv from "dotenv"
dotenv.config();
import cors from "cors"
import express from "express"
import connectDB from "./Database/db.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js"
import blogRoute from "./routes/blog.route.js"
import cloudinary from "./utils/cloudinary.js";
import commentRoute from "./routes/comments.route.js"



const app = express()

app.use(
    cors({
        origin: "http://localhost:5173", // frontend URL
        credentials: true,               // allow cookies
        methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);


app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment",commentRoute)

// app.use(cors({
//     origin:"http://localhost:5173",
//     Credential:true
// }))






app.listen(PORT, () => {
    connectDB()
    console.log(`server is running on localhost:${PORT}`);

})