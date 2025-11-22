import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCustomerData } from '../../store/slices/customerSlice'
import Order from './Order'


const Orders = () => {
  const { orders = [], products = [], isLoading, errorMessages } = useSelector((state) => state.customer || {})
  const { token, isLoggedIn } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    const t = token || localStorage.getItem('token')
    if (t) dispatch(fetchCustomerData())
  }, [dispatch, token, isLoggedIn])

  if (isLoading) return <div className="text-center mt-10">Loading...</div>
  if (errorMessages?.length > 0) return <div className="text-red-500 text-center mt-10">{errorMessages[0]}</div>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

      {(!Array.isArray(orders) || orders.length === 0) ? (
        <div className="text-gray-500">No orders found... You can order from Homepage</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {orders.map((orderItem) => (
            <Order key={(orderItem && orderItem._id) || String(orderItem)} order={orderItem} products={products} />
          ))}
        </div>
      )}
    </div>
  )
}
  export default Orders