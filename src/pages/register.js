import RootLayout from "@/components/Layouts/RootLayout";
import LoginPage from "@/components/UI/Login";
import RegisterPage from "@/components/UI/Register";
import React from "react";

const Register = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <RegisterPage />
    </div>
  );
};

export default Register;

Register.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
