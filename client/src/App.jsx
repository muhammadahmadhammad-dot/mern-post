import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home,Show, List,Create, Login, Register, AuthorShow, Edit } from "./Pages";
import AppLayout from "./Pages/Layouts/AppLayout.jsx";
import PrivateComponent from "./components/PrivateComponent.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<Show />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/my-posts"
            element={
              <PrivateComponent>
                <List />
              </PrivateComponent>
            }
          />
          <Route
            path="/my-posts/create"
            element={
              <PrivateComponent>
                <Create />
              </PrivateComponent>
            }
          />
          <Route
            path="/my-posts/:id"
            element={
              <PrivateComponent>
                <AuthorShow />
              </PrivateComponent>
            }
          />
          <Route
            path="/my-posts/edit/:id"
            element={
              <PrivateComponent>
                <Edit />
              </PrivateComponent>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
