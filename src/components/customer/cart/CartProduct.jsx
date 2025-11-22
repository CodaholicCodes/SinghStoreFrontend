import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../store/slices/customerSlice';

const CartProduct = ({ p }) => {
const dispatch = useDispatch();


  const handleRemoveCart=(productId)=>{

   dispatch(removeFromCart(productId));
  }

  return (
    <div className="flex items-center gap-4 bg-white rounded-lg p-3 shadow-sm">
      <div className="flex-shrink-0">
        <img
          src={`http://localhost:3001/${p.photoUrl.replace("\\", "/")}`}
          alt={p.name}
          className="w-20 h-20 object-contain rounded-md"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-md font-semibold text-gray-800">{p.name}</h3>
        <p className="text-sm text-gray-500">{p.brand}</p>
        <p className="text-sm text-gray-600 mt-1">{p.description?.slice(0, 80)}...</p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className="text-pink-600 font-bold">₹{p.price}</span>
        <button
          className="text-sm text-red-600 hover:underline"
          onClick={() => handleRemoveCart(p._id)}
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default CartProduct
