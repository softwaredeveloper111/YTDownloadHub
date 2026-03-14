import express from "express";
import videoRouter from "./routes/video.route.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";
import morgan from "morgan";




const app = express();




/** Application middleware */
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(morgan("dev"));
app.use("/api/video" , videoRouter);









app.use(errorHandler);
export default app;