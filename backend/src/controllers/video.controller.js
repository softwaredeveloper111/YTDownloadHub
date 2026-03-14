import AppError from "../utils/AppError.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import  {getVideoMetadata} from "../services/youtube.service.js";
import { downloadVideo } from "../services/download.service.js";



export const infoController = asyncWrapper(async (req, res) => {
  const { url } = req.body;
  if (!url) {
    throw new AppError("URL is required", 400); 
  }

  const metaData = await getVideoMetadata(url);
  res.status(200).json({
    success: true,
    data: metaData,
  });

})




export const downloadController = asyncWrapper(async (req, res) => {
  const { url , formatId , type } = req.query;
  if (!url || !formatId || !type) {
    throw new AppError("URL, formatId and type are required", 400); 
  }

  return downloadVideo(url, formatId, type, res);

})