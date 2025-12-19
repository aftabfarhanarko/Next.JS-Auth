import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";
import React from "react";
import { SiAuthelia } from "react-icons/si";

const RegisterPage = () => {
  return (
    <div className="px-5 py-8 grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="flex-2 col-span-2">
        <h2 className="text-2xl mb-5 font-bold border-l-8 pl-5 ">
          Welcome to Register Page
        </h2>
        <RegisterForm></RegisterForm>
      </div>

      <div className="flex-1 bg-gray-900 rounded text-white flex items-center justify-center flex-col gap-5">
        <SiAuthelia size={100} className=" animate-pulse" />
        <Link href={"/"} className="btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
