import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./containers/home/Home.jsx"
import Login from "./containers/login/Login.jsx"


function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
