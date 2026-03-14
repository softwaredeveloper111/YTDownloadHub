import rateLimit from "express-rate-limit";
import AppError from "../utils/AppError.js";

export const downloadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // 50 downloads per IP
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res, next) => {
    next(new AppError("Too many downloads. Try again later.", 429));
  },
});