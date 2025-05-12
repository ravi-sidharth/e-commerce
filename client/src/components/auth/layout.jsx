import React from "react";
import { Outlet } from "react-router-dom";4

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden md:flex items-center justify-center w-1/2 bg-black px-12">
        <div className="max-w-md space-y-6 text-center text-white ">
          <h1 className="text-4xl font-extrabold tracking-tight">Welcome to E-Commerce Shopping</h1>
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center bg-background text-black px-4 py-12 sm:px-6 lg:px-8" >
        <Outlet/>
      </div>
    </div>
  );
}

export default AuthLayout;
