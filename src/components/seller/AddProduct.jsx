import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const nameRef = useRef();
  const priceRef = useRef();
  const brandRef = useRef();
  const ratingRef = useRef();
  const categoryRef = useRef();
  const descRef = useRef();
  const imageRef = useRef();
  const navigate = useNavigate();
  const {token}=useSelector(state=>state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", nameRef.current.value);
    formData.append("brand", brandRef.current.value);
    formData.append("price", priceRef.current.value);
    formData.append("rating", ratingRef.current.value);
    formData.append("category", categoryRef.current.value);
    formData.append("description", descRef.current.value);
    formData.append("image", imageRef.current.files[0]);

    fetch("http://localhost:3001/api/seller/products", {
      method: 'POST',
      body: formData,
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
    .then(() => {
      console.log("Product Created");
      navigate('/');
    })
    .catch(err => {
      console.error("Upload Failed", err);
      // Optionally handle the error UI here
    });
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-900 text-center mb-6">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="product-name" className="block text-blue-800 font-semibold mb-1">
              Product Name
            </label>
            <input
              id="product-name"
              type="text"
              placeholder="Enter product name"
              ref={nameRef}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="product-price" className="block text-blue-800 font-semibold mb-1">
              Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="Enter the price"
              ref={priceRef}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="product-brand" className="block text-blue-800 font-semibold mb-1">
              Brand
            </label>
            <input
              id="product-brand"
              type="text"
              placeholder="Enter the brand"
              ref={brandRef}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="product-rating" className="block text-blue-800 font-semibold mb-1">
              Rating
            </label>
            <input
              id="product-rating"
              type="text"
              placeholder="Enter the rating"
              ref={ratingRef}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="product-category" className="block text-blue-800 font-semibold mb-1">
              Category
            </label>
            <input
              id="product-category"
              type="text"
              placeholder="Enter product category"
              ref={categoryRef}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="product-description" className="block text-blue-800 font-semibold mb-1">
              Description
            </label>
            <textarea
              id="product-description"
              placeholder="Enter the description"
              ref={descRef}
              rows="3"
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="product-image" className="block text-blue-800 font-semibold mb-1">
              Product Image
            </label>
            <input
              id="product-image"
              type="file"
              ref={imageRef}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              accept="image/*"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
