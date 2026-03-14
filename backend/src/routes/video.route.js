import { Router } from "express";
import { validateYouTubeUrl ,downloadValidation  } from "../validators/video.validate.js";
import { infoController ,downloadController} from "../controllers/video.controller.js";
import { downloadLimiter } from "../middlewares/rateLimiter.js";



const videoRouter = Router();




/**
 * @method   POST 
 * @route    /api/video/info
 * @description   Get video information by URL
 * @access  Public
 */
videoRouter.post("/info", validateYouTubeUrl , infoController);





/**
 * @method   GET
 * @route    /api/video/download
 * @description   Download video by URL
 * @access  Public
 */

videoRouter.get("/download", downloadLimiter, downloadValidation ,downloadController)











export default videoRouter;