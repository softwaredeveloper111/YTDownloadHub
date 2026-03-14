import express from "express";
import videoRouter from "./routes/video.route.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";


const app = express();




/** Application middleware */
app.use(express.json());
app.use(cors({
  baseURL: "http://localhost:5173",
  credentials: true,
}));
app.use("/api/video" , videoRouter);










app.use(errorHandler);
export default app;