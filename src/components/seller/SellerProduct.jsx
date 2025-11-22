import React from 'react'

const SellerProduct = ({ p ,handleDelete}) => {
  return (
    <div
      key={p._id}
      className="bg-blue-50 border border-blue-200 shadow-md rounded-xl p-4 hover:shadow-xl hover:border-blue-400 transition duration-300"
    >
      {/* Image Section */}
      <div className="flex justify-center items-center mb-3 bg-white rounded-lg p-2">
        <img
          src={`http://localhost:3001/${p.photoUrl.replace("\\", "/")}`}
          alt={p.name}
          className="max-h-48 w-auto object-contain rounded-md"
        />
      </div>

      {/* Product Info */}
      <h3 className="text-lg font-semibold text-blue-800 text-center">{p.name}</h3>
      <p className="text-sm text-blue-600 text-center">{p.brand}</p>

      {/* Price & Rating */}
      <div className="flex justify-between items-center mt-3">
        <span className="text-blue-700 font-bold text-base">₹{p.price}</span>
        <span className="text-yellow-500 font-medium">⭐ {p.rating}</span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mt-3">
        {p.description?.slice(0, 60)}...
      </p>

      {/* Action Button */}
      <div className="mt-4 flex justify-center">
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition m-1.5" onClick={()=>handleDelete(p._id)}>
          Delete
        </button>
    </div>
      
    </div>
  )
}

export default SellerProduct
