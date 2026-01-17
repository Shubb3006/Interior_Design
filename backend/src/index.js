import express from "express";
import dotenv from "dotenv";
import leadRoutes from "./routes/lead.route.js"
import adminRoutes from "./routes/admin.route.js"
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import path from "path";
import cors from 'cors';


dotenv.config(); 

const app=express();
const PORT=process.env.PORT;

app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
      origin: ["http://localhost:5173",
      "https://interior-design-ctac.onrender.com/"],
      credentials: true,
    })
  ); 

  const __dirname = path.resolve();

app.use("/api/leads",leadRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/auth",authRoutes)


if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../frontend/dist");

  app.use(express.static(distPath));

  app.use((req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT,()=>{
    connectDB();
    console.log("Server is listening",PORT)
})