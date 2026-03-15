import {useForm} from "react-hook-form";
import useVideo from "../hooks/useVideo";
import { toast } from "react-toastify";





export default function Hero() {

  const { register, handleSubmit } = useForm();
  const { fetchMetaDataHandler ,setVideoMetaData} = useVideo()

  const submitHandler = async (data)=>{
    setVideoMetaData(null)
   const response = await fetchMetaDataHandler(data)
    if(!response.success){
       toast.error("invalid url or something went wrong")
    }
   
  }



  return (
    <section className="text-center mb-16">
      <h1 className="text-4xl md:text-6xl font-black mb-6">
        Download YouTube Videos <br />
        <span className="gradient-text">Instantly</span>
      </h1>

      <p className="text-white  max-w-2xl mx-auto mb-10">
        **Download videos up to 1080p or extract high quality audio.**
      </p>

      <form onSubmit={handleSubmit(submitHandler)} className="glass p-2 rounded-3xl flex flex-col md:flex-row gap-3 max-w-2xl mx-auto">
        <input
          {...register("url", { required: true })}
          className="grow bg-transparent px-6 py-4 outline-none"
          placeholder="Paste YouTube URL"
        />

        <button type="submit" className="btn-gradient px-8 py-4 rounded-xl font-bol cursor-pointer">
          Fetch Video
        </button>
      </form>
    </section>
  );
}
