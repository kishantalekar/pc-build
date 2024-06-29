import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { toast } from "react-hot-toast";
import Image from "next/image";

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/orders/${orderId}`, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success("Order status updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update order status");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto">
      <Head>
        <title>Admin - Manage Orders</title>
      </Head>
      <h2 className="text-2xl font-bold border-b border-slate-400 uppercase my-4">
        Manage Orders
      </h2>
      <div className="bg-slate-100 p-5 rounded-md">
        {orders.map((order) => (
          <div key={order._id} className="mb-4 border-b pb-4">
            <h3 className="text-lg font-bold">Order ID: {order.orderId}</h3>
            <p>Amount: {order.amount} </p>
            <p>Status: {order.status}</p>
            <div className="flex flex-col gap-2 mt-2">
              <h4 className="font-bold">Products:</h4>
              {order.products.map((product) => (
                <div key={product._id} className="flex items-center gap-3 mb-2">
                  <Image
                    width={50}
                    height={60}
                    src={product.img}
                    alt={product.name}
                  />
                  <div>
                    <p>Name: {product.name}</p>
                    <p>Price: {product.price} rupees</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              {order.status === "pending" && (
                <>
                  <button
                    onClick={() => handleStatusChange(order._id, "accepted")}
                    className="btn btn-sm btn-outline"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(order._id, "rejected")}
                    className="btn btn-sm btn-outline"
                  >
                    Reject
                  </button>
                </>
              )}
              {order.status === "accepted" && (
                <>
                  <button
                    onClick={() => handleStatusChange(order._id, "processing")}
                    className="btn btn-sm btn-outline"
                  >
                    Mark as Processing
                  </button>
                  <button
                    onClick={() => handleStatusChange(order._id, "shipped")}
                    className="btn btn-sm btn-outline"
                  >
                    Mark as Shipped
                  </button>
                  <button
                    onClick={() => handleStatusChange(order._id, "delivered")}
                    className="btn btn-sm btn-outline"
                  >
                    Mark as Delivered
                  </button>
                </>
              )}
              {order.status === "rejected" && (
                <button
                  onClick={() => handleStatusChange(order._id, "rejected")}
                  className="btn btn-sm btn-outline"
                  disabled
                >
                  Rejected
                </button>
              )}
              {order.status === "processing" && (
                <button
                  onClick={() => handleStatusChange(order._id, "processing")}
                  className="btn btn-sm btn-outline btn-accent"
                  disabled
                >
                  Processing
                </button>
              )}
              {order.status === "shipped" && (
                <button
                  onClick={() => handleStatusChange(order._id, "shipped")}
                  className="btn btn-sm btn-outline btn-accent"
                  disabled
                >
                  Shipped
                </button>
              )}
              {order.status === "delivered" && (
                <button
                  onClick={() => handleStatusChange(order._id, "delivered")}
                  className="btn btn-sm btn-outline btn-accent"
                  disabled
                >
                  Delivered
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
