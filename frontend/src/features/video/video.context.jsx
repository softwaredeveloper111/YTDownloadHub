import { createContext, useState } from "react";
export const VideoContextProvider = createContext()


const VideoContext = ({children}) => {
  
  const [loader, setLoader] = useState(false)
  const [videoMetaData, setVideoMetaData] = useState(null)

  return (
 <VideoContextProvider.Provider value={{loader, setLoader, videoMetaData, setVideoMetaData}}>
  {children}
  </VideoContextProvider.Provider>
  )
}

export default VideoContext