// pages/order-history.js

import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { useUser } from "@clerk/clerk-react";
import { ClipLoader } from "react-spinners";

const OrderHistory = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/orders?userId=${user.id}`);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Head>
        <title>Order History</title>
      </Head>
      <h2 className="text-2xl font-bold border-b border-slate-400 uppercase my-4">
        Order History
      </h2>
      <div className="bg-slate-100 p-5 rounded-md">
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="mb-4 border-b pb-4">
              <h3 className="text-lg font-bold">Order ID: {order.orderId}</h3>
              <p>Amount:₹ {order.amount} </p>
              <p>Status: {order.status}</p>
              <div className="flex flex-col gap-2 mt-2">
                <h4 className="font-bold">Products:</h4>
                {order.products.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center gap-3 mb-2"
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-12 h-12 object-cover"
                    />
                    <div>
                      <p>Name: {product.name}</p>
                      <p>Price:₹{product.price} </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
