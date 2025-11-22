import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from "../../store/slices/customerSlice";
import { removeFromCart } from "../../store/slices/customerSlice";

const CustomerProduct = ({ p ,carts}) => {
const dispatch = useDispatch();


 const handleAddToCart = async (productId) => {  
    // update UI immediately
    setLocalInCart(true);
    dispatch(addToCart(productId));
  }

  const handleRemoveCart=(productId)=>{
   // update UI immediately
   setLocalInCart(false);
   dispatch(removeFromCart(productId));
  }
  console.log("Carts : ",carts);

  const cartIds = Array.isArray(carts)
    ? carts.map((c) => (c && c._id ? String(c._id) : String(c)))
    : [];

  const initialInCart = Array.isArray(carts)
    ? carts.map((c) => (c && c._id ? String(c._id) : String(c))).includes(String(p._id))
    : false;
  const [localInCart, setLocalInCart] = useState(initialInCart);

  useEffect(() => {
    const ids = Array.isArray(carts)
      ? carts.map((c) => (c && c._id ? String(c._id) : String(c)))
      : [];
    setLocalInCart(ids.includes(String(p._id)));
  }, [carts, p._id]);

  const isInCart = localInCart;
  return (
    <div
      key={p._id}
      className="bg-white border border-transparent shadow-md rounded-2xl p-4 hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
      style={{ background: 'linear-gradient(180deg, rgba(255,250,240,0.9), rgba(255,245,255,0.6))' }}
    >
      {/* Image Section */}
      <div className="flex justify-center items-center mb-3 bg-white rounded-lg p-2">
        <img
          src={`https://singhstorebackend.onrender.com/${p.photoUrl.replace("\\", "/")}`}
          alt={p.name}
          className="max-h-48 w-auto object-contain rounded-md"
        />
      </div>

      {/* Product Info */}
      <h3 className="text-lg font-semibold text-pink-700 text-center">{p.name}</h3>
      <p className="text-sm text-purple-600 text-center">{p.brand}</p>

      {/* Price & Rating */}
      <div className="flex justify-between items-center mt-3">
        <span className="text-pink-600 font-extrabold text-base">₹{p.price}</span>
        <span className="text-yellow-500 font-medium">⭐ {p.rating}</span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mt-3">
        {p.description?.slice(0, 60)}...
      </p>
      
      <div className="mt-4 flex justify-center">
      {isInCart ? (
        <button
          className="bg-pink-600 text-white px-4 py-2 rounded-full m-1.5 shadow"
          onClick={() => handleRemoveCart(p._id)}
        >
          🛒 Remove
        </button>
      ) : (
        <button
          className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white px-4 py-2 rounded-full hover:from-pink-600 hover:to-yellow-500 transition m-1.5 shadow"
          onClick={() => handleAddToCart(p._id)}
        >
          🛒 Add
        </button>
      )}
     </div>
      
    </div>
  )
}

export default CustomerProduct
