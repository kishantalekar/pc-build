import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const Pcbuilder = () => {
  const { products } = useAppSelector((state) => state.product);
  const router = useRouter();

  const categories = {
    processor: "CPU/Processor",
    motherboard: "Motherboard",
    ram: "Ram",
    supply: "Power supply unit",
    storage: "Storage Device",
    monitor: "Monitor",
    others: "Others",
  };

  const handleSubmit = () => {
    if (products.length === Object.keys(categories).length) {
      router.push("/checkout");
    } else {
      toast.error("Please select all components before proceeding to checkout");
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold border-b border-slate-400 uppercase my-4">
        PC Build
      </h2>
      <div>
        <h4 className="text-center font-bold text-xl bg-slate-500 rounded-lg text-white">
          Component select
        </h4>
      </div>
      <div className="w-[50%] mx-auto bg-slate-100 p-5 rounded-md">
        {Object.entries(categories).map(([category, label]) => {
          const items = products.filter(
            (product) => product?.category === category
          );
          return (
            <div key={category} className="mb-4">
              <div className="flex justify-between items-center bg-white p-4 rounded-md border-b border-slate-500">
                <h2 className="font-bold">{label}</h2>
                <Link href={`/pcbuild/${category}`}>
                  <button
                    className={`btn btn-sm btn-outline btn-accent ${
                      items.length === 1 && "hidden"
                    }`}
                  >
                    Choose
                  </button>
                </Link>
              </div>
              {items.map((item) => (
                <div key={item._id} className="ml-5 flex items-center gap-3">
                  <Image
                    width={50}
                    height={60}
                    src={item?.img}
                    alt={`${category} part`}
                  />
                  <p>{item?.name}</p>
                </div>
              ))}
            </div>
          );
        })}
        <button
          onClick={handleSubmit}
          className={`btn btn-primary w-full mt-8 ${
            products.length !== Object.keys(categories).length && "disabled"
          }`}
        >
          {products.length === Object.keys(categories).length
            ? "Complete Build"
            : "Select items"}
        </button>
      </div>
    </div>
  );
};

export default Pcbuilder;
