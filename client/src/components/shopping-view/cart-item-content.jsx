import { Minus, Plus, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItems, upadateCartQuantity } from "@/store/cart-slice";
import { toast } from "sonner";
import { Card } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getShoppingProduct } from "../../store/shopping-product-slice";

function UserCartItemsContent({ cartItems }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { shoppingProductList } = useSelector((state) => state.shoppingProduct);
  const title = cartItems?.title
    .split(" ")
    .splice(0, 4)
    .join(" ")
    .concat("...");
  const discount = (
    ((cartItems.price - cartItems.salePrice) / cartItems.price) *
    100
  ).toFixed(0);

  useEffect(() => {
    dispatch(getShoppingProduct({ filterParams: {}, sortParams: null }));
  }, [dispatch]);

  function handleUpdateQuantity(getCartItme, typeOfAction, newSize) {
    if (typeOfAction === "plus") {
      const findCurrentIndex = shoppingProductList.findIndex((item) => {
        return item?._id === cartItems?._id;
      });
      if (findCurrentIndex > -1) {
        const getTotalStock = shoppingProductList[findCurrentIndex].stock;
        if (getCartItme.quantity + 1 > getTotalStock) {
          toast.error(`Only ${getTotalStock} can be added for this items.`);
          return;
        }
      }
    }

    dispatch(
      upadateCartQuantity({
        userId: user?.id,
        productId: getCartItme._id,
        quantity:
          typeOfAction === "plus"
            ? getCartItme.quantity + 1
            : typeOfAction === "minus"
            ? getCartItme.quantity - 1
            : getCartItme.quantity,
        size: newSize ? newSize : getCartItme.selectedSize,
      })
    ).then((data) => {
      if (data.payload.success) {
        toast.success(data.payload.message);
      }
    });
  }

  function handleCartItemDelete(getCartItemId) {
    dispatch(
      deleteCartItems({ userId: user?.id, productId: getCartItemId })
    ).then((data) => {
      if (data.payload.success) {
        toast.success(data.payload.message);
      }
    });
  }

  console.log(shoppingProductList, "shopping product list");
  return (
    <Card className="flex items-center justify-center flex-row gap-3 p-1 px-2">
      <img
        src={cartItems.images[0]}
        alt={cartItems.title}
        className="w-14 h-24 object-contain rounded-lg"
      />
      <div className="flex-1">
        <div className="text-sm font-medium">{cartItems?.brand?.name}</div>
        <div className="text-sm font-medium">{title}</div>
        <div className="flex gap-2 text-sm">
          <p className="font-semibold">
            ₹{cartItems?.salePrice * cartItems?.quantity}
          </p>
          <p className="font-semibold line-through text-slate-600">
            ₹{cartItems?.price * cartItems?.quantity}
          </p>
          <p className="font-semibold">{discount}% off</p>
        </div>
        <div className="flex gap-3 items-center mt-1">
          <div className="flex items-center mt-0.5 gap-2">
            <Button
              disabled={cartItems?.quantity === 1 ? true : false}
              onClick={() => handleUpdateQuantity(cartItems, "minus")}
              variant="outline"
              size="icon"
              className="rounded-full h-5 w-5"
            >
              <Minus /> <span className="sr-only">Decrease</span>{" "}
            </Button>
            <span>{cartItems?.quantity}</span>
            <Button
              onClick={() => handleUpdateQuantity(cartItems, "plus")}
              variant="outline"
              size="icon"
              className="rounded-full h-5 w-5"
            >
              <Plus />
              <span className="sr-only">Increase</span>
            </Button>
          </div>

          <Select
            value={cartItems.selectedSize}
            onValueChange={(value) => {
              handleUpdateQuantity(cartItems, "", value);
            }}
          >
            <SelectTrigger className="rounded-full">
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {cartItems && cartItems.size
                ? cartItems.size.split(",").map((item, index) => {
                    return (
                      <SelectItem value={item} key={index}>
                        {item}
                      </SelectItem>
                    );
                  })
                : null}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col items-end p-3 ">
        <Trash className="fill-red-500 text-white" onClick={() => handleCartItemDelete(cartItems._id)} size={18} />
      </div>
    </Card>
  );
}

export default UserCartItemsContent;
