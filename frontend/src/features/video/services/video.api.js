import axios from "axios";




const instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});



export const getMetaDataAPI = async(url)=>{
  try {
    const response = await instance.post('/api/video/info', url );
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}