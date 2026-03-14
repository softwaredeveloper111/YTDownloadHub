import express from "express";
import videoRouter from "./routes/video.route.js";
import errorHandler from "./middlewares/errorHandler.js";



const app = express();




/** Application middleware */
app.use(express.json());
app.use("/api/video" , videoRouter);










app.use(errorHandler);
export default app;