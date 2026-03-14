import { createContext, useState } from "react";
export const VideoContextProvider = createContext()


const VideoContext = ({children}) => {
  
  const [loading, setLoading] = useState(false)
  const [videoMetaData, setVideoMetaData] = useState(null)

  return (
 <VideoContextProvider.Provider value={{loading, setLoading, videoMetaData, setVideoMetaData}}>
  {children}
  </VideoContextProvider.Provider>
  )
}

export default VideoContext