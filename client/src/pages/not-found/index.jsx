import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="font-extrabold text-5xl mb-4">404</div>
      <div className="font-medium text-3xl mb-4">page doesn't found</div>
      <Button variant="outline" asChild>
        <Link to={"/shop/home"}> Go to home page</Link>
      </Button>
    </div>
  );
};

export default NotFound;
