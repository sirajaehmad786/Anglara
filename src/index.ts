import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user";
import blogRouter from "./routes/blog";
import connectDB from "./config/db";  
import http from "http";


dotenv.config();

const app: Application = express();
const server = http.createServer(app);
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

const PORT: number = Number(process.env.PORT) || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// process.on("SIGTERM", () => {
//     console.log("Closing server...");
//     server.close(() => {
//       console.log("Server closed.");
//       process.exit(0);
//     });
//   });
  