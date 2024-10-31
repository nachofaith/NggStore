import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Page404 from "./components/Page404.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import Category from "./pages/Category.jsx";
import Categories from "./pages/Categories.jsx";
import { CartProvider } from "./context/cart.jsx";
import Carrito from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Profile from "./pages/Profile.jsx"; // Importa el componente Profile
import RutaProtegida from "./components/RutaProtegida.jsx"; // Importa la ruta protegida
import { AuthProvider } from "./context/AuthContext.jsx"; // Importa el AuthProvider
import Payment from "./pages/Payment.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/producto/:idProd" element={<SingleProduct />} />
                <Route path="/category/:idCat" element={<Category />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/cart" element={<Carrito />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/*" element={<Page404 />} />
                <Route path="/payment" element={<Payment />} />


                {/* Ruta protegida para el perfil */}
                <Route path="/profile" element={<RutaProtegida element={<Profile />} />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
