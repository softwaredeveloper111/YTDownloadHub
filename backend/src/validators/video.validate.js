import { body,query, validationResult } from "express-validator";



const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.status = 400;
    error.details = errors.array();
    return next(error);
  }
  next();
};





export const validateYouTubeUrl = [
  body("url")
    .notEmpty()
    .withMessage("URL is required")
    .isURL()
    .withMessage("Invalid URL format")
    .custom((value) => {
      const youtubeRegex =
        /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
      if (!youtubeRegex.test(value)) {
        throw new Error("URL must be a valid YouTube URL");
      }
      return true;
    }),
  handleValidationErrors,
];



export const downloadValidation = [
  query("url")
    .notEmpty()
    .withMessage("URL is required")
    .isURL()
    .withMessage("Invalid URL format")
    .custom((value) => {
      const youtubeRegex =
        /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
      if (!youtubeRegex.test(value)) {
        throw new Error("URL must be a valid YouTube URL");
      }
      return true;
    }),

  query("formatId")
    .notEmpty()
    .withMessage("formatId is required"),

  query("type")
    .notEmpty()
    .withMessage("type is required")
    .isIn(["video", "audio"])
    .withMessage("type must be video or audio"),


  handleValidationErrors,
];