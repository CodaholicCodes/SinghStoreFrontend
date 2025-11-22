import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerData } from "../../store/slices/customerSlice";
import CustomerProduct from "./CustomerProduct";


const CustomerHome = () => {
  const { products, isLoading, errorMessages, carts } = useSelector(
    (state) => state.customer
  );
  const { token, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

 

  useEffect(() => {
    // only fetch customer data when we have a token
    const t = token || localStorage.getItem('token');
    if (t) {
      dispatch(fetchCustomerData());
    }
  }, [dispatch, token, isLoggedIn]);

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (errorMessages?.length > 0)
    return <div className="text-red-500 text-center mt-10">{errorMessages[0]}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Products</h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <CustomerProduct key={p._id} p={p} carts={carts} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerHome;
