import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./Header";

const ShoppingLayout = () => {
  return (
    <div>
      <ShoppingHeader />
      <main className="max-w-[1600px] mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ShoppingLayout;
