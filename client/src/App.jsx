import ImageAi from "./components/ImageAi"
import Main from "./components/Main"
import Sidebar from "./components/Sidebar"
import './index.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  return (
    <>
    <BrowserRouter>
    <div  className="flex w-screen h-screen ">
      <Sidebar/>
      <Main/>

    </div>
    

    </BrowserRouter>
      
    </>
  )
}

export default App
