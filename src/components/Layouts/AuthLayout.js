import React from "react";
import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <div className="h-[100vh]">{children}</div>
    </div>
  );
};

export default AuthLayout;
