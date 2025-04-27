import {BrowserRouter,Routes,Route } from "react-router-dom"
import { Home, List, Login, Register } from "./Pages"
import AppLayout from "./Pages/Layouts/AppLayout.jsx"
import PrivateComponent from "./components/PrivateComponent.jsx"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />} >
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/my-posts" element={<PrivateComponent>
        <List />
      </PrivateComponent>}
       />

      </Route>
    </Routes>
    </BrowserRouter>
    )
}

export default App
