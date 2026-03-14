
import Header from "../components/Header";
import Hero from "../components/Hero";
import VideoCard from "../components/VideoCard";
import SkeletonLoader from "../components/SkeletonLoader";
import Footer from "../components/Footer";

function App(){



return(

<div className="min-h-screen text-white relative">

<div className="fixed inset-0 -z-10 animate-mesh opacity-40"/>

<div className="container mx-auto px-4 py-10 max-w-4xl">

<Header/>

<Hero/>

{<SkeletonLoader/>}

{<VideoCard/>}

<Footer/>

</div>

</div>

);

}

export default App;