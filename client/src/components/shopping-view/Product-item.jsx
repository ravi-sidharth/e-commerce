import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { XIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function ShoppingProductItem({ product, handleDelete }) {
  const productTitle = product.title.split(" ").slice(0, 3).join(" ") + "...";
  const discount = (
    ((product.price - product.salePrice) / product.price) *
    100
  ).toFixed(0);

  const navigate = useNavigate();

  return (
    <Card className="z-0 relative shadow-2xl hover:outline transition-shadow duration-300">
      {handleDelete ? (
        <div
          onClick={() => handleDelete(product._id)}
          className="cursor-pointer absolute top-3 left-3"
        >
          <XIcon className="text-white" />
        </div>
      ) : null}

      <Link to={`/shop/details/${product._id}`}>
        <CardContent className="">
          <div className="absolute top-3 left-3">
            {product.stock === 0 ? (
              <Badge className="bg-red-600 rounded-full text-white font-bold">
                Out of stock
              </Badge>
            ) : product.stock <= 10 ? (
              <Badge
                variant={"descructive"}
                className="bg-red-600 rounded-full text-white font-bold"
              >
                left only {product.stock}
              </Badge>
            ) : null}
          </div>
          <Badge className="absolute top-3 right-3 text-sm">
            {discount}% off
          </Badge>
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-48 lg:h-64 object-contain object-center rounded-sm"
          />
          <div className="mx-[-10px]">
            <div className="flex justify-between items-center text-sm font-semibold mt-1">
              <div className="text-sm">{product.brand?.name}</div>
              <div className="text-slate-500">{product.subcategory?.name}</div>
            </div>
            <div className="text-gray-600 text-sm lg:text-base">
              {productTitle}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-md lg:text-lg font-bold">
                ₹{product.salePrice}
              </span>
              <span className="text-gray-500 line-through text-sm lg:text:md">
                ₹{product.price}
              </span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export default ShoppingProductItem;
