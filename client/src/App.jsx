import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Page404 from "./components/Page404.jsx";



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

 

    



      </Routes>
    </BrowserRouter>
  );
}
