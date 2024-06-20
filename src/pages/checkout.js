// pages/checkout.js

import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/clerk-react";

const Checkout = () => {
  const { products } = useAppSelector((state) => state.product);
  // const { data: session } = useSession();
  const router = useRouter();

  const { user } = useUser();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [shippingDetails, setShippingDetails] = useState({
    address: "",
    phoneNumber: "",
    additionalNotes: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = () => {
    let total = 0;
    products.forEach((product) => {
      // Replace commas with an empty string to remove them
      const priceWithoutCommas = product.price.replace(/,/g, "");
      // Parse the price to ensure it's treated as a number
      const price = parseInt(priceWithoutCommas);
      // Add to total
      total += price;
    });
    setTotalPrice(total);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handlePlaceOrder = async () => {
    try {
      const order = await axios.post("/api/create-order", {
        amount: totalPrice,
        products,
        userId: user.id, // Replace with actual user id (if available)
        email: user.emailAddresses[0].email,
        address: shippingDetails.address,
        phoneNumber: shippingDetails.phoneNumber,
        additionalNotes: shippingDetails.additionalNotes,
      });

      const options = {
        key: "rzp_test_WHDwkn3KLG9Dqe", // Enter the Key ID generated from the Dashboard
        amount: order.data.amount,
        currency: "INR",
        name: "Pc cloud",
        description: "Test Transaction",
        // image: "/your_logo.png",
        order_id: order.data.id,
        handler: function (response) {
          // Payment successful logic
          toast.success("Payment successful!");
          // Redirect to a new page
          router.push("/");
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      toast.error("Payment failed!");
      console.log(error);
    }
  };
  useEffect(() => {
    calculateTotalPrice();
  }, []);

  return (
    <div className="container mx-auto mt-20">
      <Head>
        <title>Checkout</title>
      </Head>
      <h2 className="text-2xl font-bold border-b border-slate-400 uppercase my-4">
        Checkout
      </h2>
      <div className="grid grid-cols-2 gap-8">
        {/* Left Side: Shipping Details Form */}
        <div>
          <h3 className="text-lg font-bold mb-2">Shipping Details</h3>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Email Id:
              </label>
              <input
                disabled
                type="text"
                id="address"
                name="address"
                value={user?.emailAddresses}
                // onChange={handleChange}
                required
                className="mt-1  block w-full border-grey-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500  sm:text-lg p-6"
              />
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your shipping address"
                value={shippingDetails.address}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-lg p-6"
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={shippingDetails.phoneNumber}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-1 border-gray-300 rounded-md shadow-sm focus-pr focus:ring-primary-500 focus:border-primary-500 sm:text-lg p-6"
              />
            </div>
            <div>
              <label
                htmlFor="additionalNotes"
                className="block text-sm font-medium text-gray-700"
              >
                Additional Info (Optional)
              </label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                rows={3}
                placeholder="additonal info"
                value={shippingDetails.additionalNotes}
                onChange={handleChange}
                className="mt-1 block w-full border-black  rounded-md shadow-sm  focus:ring-primary-500 focus:border-primary-500 sm:text-lg p-6"
              />
            </div>
          </form>
        </div>

        {/* Right Side: Selected Items */}
        <div className="bg-slate-100 p-5 rounded-md">
          <h3 className="text-lg font-bold mb-2">Selected Items</h3>
          {products.map((product) => (
            <div
              key={product._id}
              className="flex items-center gap-3 mb-4 border-b pb-4"
            >
              <Image
                width={50}
                height={40}
                src={product.img}
                alt={product.name}
              />
              <div className="flex-grow">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm">Price: ₹ {product.price}</p>
                {/* <p className="text-sm">Key Features: {product.keyFeature}</p> */}
              </div>
            </div>
          ))}
          <div className="text-right mt-6">
            <h3 className="text-xl font-bold">Total Price: ₹ {totalPrice}</h3>
            <button
              onClick={handlePlaceOrder}
              className={`btn btn-primary mt-4 `}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
