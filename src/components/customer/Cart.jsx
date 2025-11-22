import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerData } from "../../store/slices/customerSlice";
import CartSummary from "./cart/CartSummary";
import CartItems from "./cart/CartItems";

const Cart = () => {
  const { products,carts,isLoading,errorMessages } = useSelector(
    (state) => state.customer
  );
  const dispatch = useDispatch();

const cartIds = Array.isArray(carts)
  ? carts.map((c) => (c && c._id ? String(c._id) : String(c)))
  : [];
const productsInCart = products.filter((product) => cartIds.includes(String(product._id)));


  useEffect(() => {
    dispatch(fetchCustomerData());
  }, [dispatch]);

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (errorMessages?.length > 0)
    return <div className="text-red-500 text-center mt-10">{errorMessages[0]}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Products</h2>

      {productsInCart.length === 0 ? (
        <p className="text-gray-500">No products found in cart</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
        
          <div className="flex-1">
            <CartItems products={productsInCart} />
          </div>

  
          <aside className="w-full lg:w-96 bg-white rounded-lg p-4 shadow-md sticky top-24">
            <CartSummary products={productsInCart} />
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;
