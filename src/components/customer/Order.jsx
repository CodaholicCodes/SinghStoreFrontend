import React from 'react'

const Order = ({ order, products}) => {
  if (!order) return null;

  const productsInOrder = Array.isArray(order.products)
    ? order.products.map((item) => {
        if (item && typeof item === 'object' && (item._id || item.name)) return item;
       
        const pid = item && (item._id || item) ? String(item._id || item) : null;
        if (!pid) return { _id: pid, name: String(item) };
        return products.find((p) => String(p._id) === pid) || { _id: pid, name: pid };
      })
    : [];

  const createdAt = order.createdAt || order.createdAt || order.date;
  const dateStr = createdAt ? new Date(createdAt).toLocaleString() : '';

  const subtotal = Number(order.totalAmount) || productsInOrder.reduce((s, pr) => s + (Number(pr && pr.price) || 0), 0);
  const gst = Math.round(subtotal * 0.18);
  const shipping = subtotal > 500 ? 0 : 50;
  const grandTotal = subtotal + gst + shipping;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">Order ID: <span className="font-mono text-sm text-gray-600">{order._id || String(order)}</span></h3>
            {dateStr && <div className="text-xs text-gray-500">Placed: {dateStr}</div>}
          </div>
          {(
            // show subtotal and totals area
            <div className="text-right text-sm font-semibold">
              <div className="text-xs text-gray-500">Subtotal</div>
              <div className="text-lg text-pink-600">₹{subtotal}</div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-3">
        {productsInOrder.length === 0 ? (
          <div className="text-sm text-gray-500">No product details available for this order.</div>
        ) : (
          productsInOrder.map((p) => (
            <div key={p._id} className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                {typeof p.photoUrl === 'string' && p.photoUrl ? (
                  <img src={`https://singhstorebackend.onrender.com/${String(p.photoUrl).replace(/\\/g, '/').replace(/^\//, '')}`} alt={p.name || 'product'} className="w-full h-full object-contain" />
                ) : (
                  <div className="text-xs text-gray-400">No image</div>
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{p && p.name ? p.name : String(p._id || p)}</div>
                {p && p.brand && <div className="text-xs text-gray-500">{p.brand}</div>}
              </div>
              <div className="text-sm font-semibold">{Number(p && p.price) ? `₹${Number(p.price)}` : ''}</div>
            </div>
          ))
        )}
                  {/* Order summary */}
                  <div className="mt-3 border-t pt-3 text-sm text-gray-700">
                    <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
                    <div className="flex justify-between"><span>GST (18%)</span><span>₹{gst}</span></div>
                    <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
                    <div className="flex justify-between font-bold text-gray-900 mt-2"><span>Total</span><span>₹{grandTotal}</span></div>
                  </div>
      </div>
    </div>
  )
}

export default Order