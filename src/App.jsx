import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./containers/home/Home.jsx"
import Login from "./containers/login/Login.jsx"
import PacienteHome from "./containers/paciente/PacienteHome.jsx"
import PacienteCadastro from "./containers/paciente/PacienteCadastro.jsx"



function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/pacientehome" element={<PacienteHome/>}/>
          <Route path="/pacientecadastro" element={<PacienteCadastro/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
