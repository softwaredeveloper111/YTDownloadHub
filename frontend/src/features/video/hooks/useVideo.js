import { useContext } from "react";
import { getMetaDataAPI } from "../services/video.api";
import { VideoContextProvider } from "../video.context.jsx";


const useVideo = () => {
  const { loading, setLoading, videoMetaData, setVideoMetaData } = useContext(VideoContextProvider);

  const fetchMetaDataHandler  = async (url) => {
    
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


  return { loading, videoMetaData, fetchMetaDataHandler }
  
}

export default useVideo