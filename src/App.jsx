import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./components/seller/AddProduct";
import NavBar from "./nav/NavBar";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import { useSelector } from "react-redux";
import SellerHome from './components/seller/SellerHome';
import CustomerHome from "./components/customer/CustomerHome";
import Cart from "./components/customer/Cart";
import Orders from "./components/customer/Orders";

function App() {
const {userType} =useSelector(state=>state.auth);
  
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col" style={{background: 'linear-gradient(180deg, #fff7fb 0%, #fffaf0 50%, #f0f7ff 100%)'}}>
        <NavBar />

        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={userType==='seller' ? <SellerHome /> : <CustomerHome />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>

        <footer className="py-4 bg-gray-200 text-center text-sm text-gray-600">
          © 2025 Singh Store Private Ltd
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
