import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux';
import { placeOrder } from '../../../store/slices/customerSlice';

const CartSummary = ({ products = [] }) => {
const dispatch=useDispatch();
const handleCheckout=()=>{
  dispatch(placeOrder());
}


  const itemCount = products.length;
  // Use original calculation logic: subtotal, tax 18%, shipping free over 500
  const subtotal = useMemo(() => products.reduce((sum, p) => sum + (Number(p.price) || 0), 0), [products]);
  const tax = subtotal * 0.18;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  return (
    <div className="p-4 bg-gradient-to-b from-white to-pink-50 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-3">Order Summary</h3>

      <div className="text-sm text-gray-600 space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Items ({itemCount})</span>
          <span className="font-medium text-gray-800">₹{subtotal}</span>
        </div>
        {/* No discount in original logic; remove discount row */}
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-medium text-gray-800">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (GST)</span>
          <span className="font-medium text-gray-800">₹{Math.round(tax)}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total</span>
          <span className="text-2xl font-extrabold text-pink-600">₹{total}</span>
        </div>
      </div>

      <div className="mb-3">
        <label className="text-xs text-gray-600">Have a coupon?</label>
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            placeholder="Enter code"
            className="flex-1 px-3 py-2 border rounded-md text-sm"
          />
          <button className="bg-pink-600 text-white px-3 py-2 rounded-md text-sm">Apply</button>
        </div>
      </div>

      <button className="w-full py-3 rounded-md text-white font-semibold bg-gradient-to-r from-pink-500 to-yellow-400 shadow-md hover:opacity-95"
      onClick={handleCheckout}>
        Proceed to Checkout
      </button>

      <div className="mt-3 text-xs text-gray-500">
        <p>Secure checkout • 30-day returns • Easy refunds</p>
      </div>
    </div>
  )
}

export default CartSummary