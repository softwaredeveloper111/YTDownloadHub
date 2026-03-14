

import { Routes,Route } from "react-router-dom";
import Home from "./features/video/pages/Home";


const AppRouter = () => {
  return (
  
    <Routes>
        <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default AppRouter