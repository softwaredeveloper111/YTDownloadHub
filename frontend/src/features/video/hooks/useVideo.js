import { useContext } from "react";
import { getMetaDataAPI ,downloadVideoAPI } from "../services/video.api";
import { VideoContextProvider } from "../video.context.jsx";


const useVideo = () => {
  const { loading, setLoading, videoUrl,  setVideoUrl, videoMetaData, setVideoMetaData } = useContext(VideoContextProvider);

  const fetchMetaDataHandler  = async (url) => {
    
    setVideoUrl(url.url)
    setLoading(true);
    try {
      const response = await  getMetaDataAPI(url);
      console.log(response.data)
      setVideoMetaData(response.data);
      return {success:true, data: response.data}
    } catch (error) {
      console.log(error.message);
      return {success:false, data: null}

    }finally {
      setLoading(false);
    }
    
  }


  const downloadVideoHandler =  (url, formatId, type) => {
    
    try {
       downloadVideoAPI(url, formatId, type);
    } catch (error) {
      console.log(error.message);
    }
  };


  return { loading, videoMetaData, videoUrl,  setVideoUrl, fetchMetaDataHandler, downloadVideoHandler  }
  
}

export default useVideo