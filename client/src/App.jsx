import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Page404 from "./components/Page404.jsx";
import Dashboard from "./Dashboard.jsx";
import Users from "./components/Dashboard/Users.jsx";
import Aside from "./components/Dashboard/Aside.jsx";

const DashboardLayout = () => {
  return (
    <div>
      <Aside />
      <Routes>
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />} />
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
      </Routes>
    </BrowserRouter>
  );
}
