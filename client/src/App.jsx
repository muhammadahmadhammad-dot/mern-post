import {BrowserRouter,Routes,Route } from "react-router-dom"
import { Home, Login, Register } from "./Pages"
import AppLayout from "./Pages/Layouts/AppLayout.jsx"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />} >
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      </Route>
    </Routes>
    </BrowserRouter>
    )
}

export default App
