import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../store/slices/authSlice";

const NavBar = () => {
  const { isLoggedIn, userType } = useSelector((state) => state.auth);
  const carts = useSelector((state) => state.customer?.carts ?? []);
  const cartCount = Array.isArray(carts) ? carts.length : 0;
  const dispatch = useDispatch();
const handleLogout=()=>{
  dispatch(logOut());
}

  return (
    <nav className="bg-gradient-to-r from-pink-500 via-yellow-300 to-indigo-500 text-white shadow-lg">
      <div className="container mx-auto flex items-center p-4">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-extrabold tracking-wide">Singh<span className="text-yellow-300">Store</span></div>
          <div className="hidden md:block">
            <input
              type="search"
              placeholder="Search for products, brands and more"
              className="px-3 py-2 rounded-lg w-96 text-sm text-gray-800"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <Link to="/" className="text-white hover:underline text-sm">Home</Link>
          {isLoggedIn && userType === 'seller' && (
            <Link to="/add-product" className="text-white hover:underline text-sm">Add Product</Link>
          )}

          {isLoggedIn && userType === 'customer' && (
            <Link to="/cart" className="relative text-white hover:underline text-sm">
              Carts
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 inline-flex items-center justify-center bg-red-600 text-white text-xs font-semibold rounded-full h-5 w-5">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {isLoggedIn && userType === 'customer' && (
            <Link to="/orders" className="text-white hover:underline text-sm">Orders</Link>
          )}

          {!isLoggedIn && (
            <Link to="/login" className="text-white bg-white/20 px-3 py-1 rounded text-sm">Login</Link>
          )}
          {!isLoggedIn && (
            <Link to="/register" className="text-pink-600 bg-white px-3 py-1 rounded text-sm font-semibold">Register</Link>
          )}

          {isLoggedIn && (
            <button className="text-white bg-white/20 px-3 py-1 rounded text-sm" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
