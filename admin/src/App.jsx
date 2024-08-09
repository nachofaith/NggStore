import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./pages/Dashboard";
import Page404 from "./pages/404";
import Aside from "./components/Aside.jsx";
import Marcas from "./components/Marcas.jsx";
import Categorias from "./components/Categorias.jsx";
import Users from "./components/Users.jsx";
import Products from "./components/Products.jsx";

export default function App() {
  return (
    <BrowserRouter>
      {/* rutas protegidas */}
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard/*"
            element={
              <div>
                <Aside />
                <main>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/marcas" element={<Marcas />} />
                    <Route path="/categorias" element={<Categorias />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/*" element={<Page404 />} />
                  </Routes>
                </main>
              </div>
            }
          />
        </Route>

        {/* rutas publicas */}
        <Route
          path="*"
          element={
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
