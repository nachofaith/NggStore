import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Page404 from "./components/Page404.jsx";
import Dashboard from "./Dashboard.jsx";
import ProtectedRoute from "./components/Dashboard/ProtectedRoute.jsx";
import Aside from "./components/Dashboard/Aside.jsx";
import Users from "./components/Dashboard/Users.jsx";
import HomeDS from "./components/Dashboard/Home.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <div>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/*" element={<Page404 />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />

        <Route
          path="/dashboard/*"
          element={
            <div>
              <Aside />
              <main>
                <Routes>
                  <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/home" element={<HomeDS />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/*" element={<Page404 />} />
                  </Route>
                </Routes>
              </main>
            </div>
          }
        />

        {/* <Route path="/dashboard/*" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
