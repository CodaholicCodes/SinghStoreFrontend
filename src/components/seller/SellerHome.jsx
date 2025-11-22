import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchSellerProducts } from "../../store/slices/sellerSlice";
import SellerProduct from "./SellerProduct";

const SellerHome = () => {
  const { products, isLoading, errorMessages } = useSelector(
    (state) => state.seller
  );
  const dispatch = useDispatch();

  const handleDeleteProduct = async (productId) => {  
const token=localStorage.getItem('token');
   const response =await fetch(`https://singhstorebackend.onrender.com/api/seller/products/${productId}`, {
      method: 'DELETE',
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
    if(response.status===200){
      dispatch(deleteProduct(productId));
    }
    else{
      const data=await response.json();
      console.log(data.message);
    }
  }

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

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
            <SellerProduct key={p._id} p={p} handleDelete={handleDeleteProduct}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerHome;
