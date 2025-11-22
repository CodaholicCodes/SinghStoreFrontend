import React from 'react'
import CartProduct from './CartProduct';

const CartItems = ({ products }) => {
  return (
    <div className="space-y-4">
      {products.map((p) => (
        <CartProduct key={p._id} p={p} />
      ))}
    </div>
  );
};

export default CartItems