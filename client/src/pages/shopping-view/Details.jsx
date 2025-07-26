import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"
import { addToCart, fetchCartItems } from "@/store/cart-slice/index";
import { Heart, MoveLeftIcon, ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createWishlist,fetchAllWishlist } from "@/store/wishlist-slice";
import Review from "@/components/shopping-view/review";
import { fetchProductDetails } from "@/store/shopping-product-slice";

const ShoppingDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [size, setSize] = useState(null);
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { productDetails } = useSelector((state) => state.shoppingProduct);
  const { wishlistList } = useSelector((state) => state.shopWishlist);
  const { isLoading, cartItems } = useSelector((state) => state.shoppingCart);

  useEffect(() => {
    dispatch(fetchCartItems({ userId: user?.id }));
    dispatch(fetchProductDetails(id));
    dispatch(fetchAllWishlist(user?.id));
  }, [dispatch]);

  function handleAddToCart() {
    if (productDetails.size !== "" && size == null) {
      toast.error("Please select the size.");
      return;
    }
    const getCartItems = cartItems.items || [];
    if (getCartItems.length > 0) {
      const indexofCurrentItem = getCartItems.findIndex((item) => {
        return item._id === productDetails?._id;
      });
      if (indexofCurrentItem > -1) {
        const getquantity = getCartItems[indexofCurrentItem].quantity;
        if (getquantity + 1 > productDetails?.stock) {
          toast.error(`Only ${productDetails?.stock} products can be added for this items.`);
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: productDetails?._id,
        quantity: 1,
        size,
      })
    ).then((data) => {
      if (data.payload.success) {
        toast.success(data.payload.message || "Cart added successfully");
        dispatch(fetchCartItems({ userId: user?.id }));
      }
    });
  }

  function handleWishlist() {
    dispatch(
      createWishlist({ userId: user?.id, productId: productDetails?._id })
    ).then((data) => {
      if (data.payload.success) {
        toast.success(data.payload.message);
        dispatch(fetchAllWishlist(user?.id));
      }
    });
  }

  const checkWishlistOrNot =
    wishlistList && wishlistList.length > 0
      ? wishlistList.findIndex((item) => {
          return item._id == id;
        })
      : -1;

  return (
    <>
     <button
        onClick={() => navigate(-1)}
        className="mb-3 px-4 pt-2"
      >
        <div className="flex justify-center items-center gap-2 hover:text-blue-400">
        <MoveLeftIcon className=""/> <span className="text-xl font-bold"> Go Back</span>
        </div>
      </button>
      {productDetails?._id ? (
        <div className="px-2  w-full flex flex-col lg:flex-row justify-center">
          <div className="w-full">
            <div className="grid grid-cols-2 gap-1 border ">
              {productDetails.images.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="h-[100px] md:h-[250px] overflow-hidden border"
                  >
                    <img
                      src={item}
                      className="cursor-move object-contain hover:scale-110 transition-all duration-500"
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full px-2 md:px-10 space-y-1">
            <div className="text-sm underline font-medium text-blue-500">
              {productDetails?.brand?.name}:{productDetails?.category?.name}-{productDetails?.subcategory?.name}
            </div>
            <div className="text-lg md:text-xl">{productDetails?.title}</div>
            <div className="">
              {productDetails.stock === 0 ? (
                <Badge className={"bg-red-600 rounded-full text-white font-bold"}>Out of stock</Badge>
              ) : productDetails.stock <= 10 ? (
                <Badge variant={"primary"} className="bg-red-600 text-white rounded-full border-none ">
                  left only {productDetails.stock}
                </Badge>
              ) : null}
            </div>
            <div className="text-sm font-medium text-green-600">
              Special price
            </div>
            <div className="flex items-center gap-3">
              <span className=" text-xl md:text-2xl font-bold">
                ₹{productDetails?.salePrice}
              </span>
              <span className="text-gray-500 font-bold text-lg md:text-xl line-through">
                ₹{productDetails?.price}
              </span>
              <span className="text-xl md:text-2xl font-bold">
                {(
                  ((productDetails?.price - productDetails?.salePrice) /
                    productDetails?.price) *
                  100
                ).toFixed(0)}
                % off
              </span>
            </div>
            <div className="space-y-2">
              <div className="font-medium">Select Size</div>
              <div className="flex gap-3">
                {productDetails.size?.split(",").map((item) => {
                  return (
                    <Label
                      key={item}
                      onClick={(e) => setSize(e.target.innerText)}
                      className={` ${
                        size === item ? "border border-black" : null
                      } w-10 h-10 flex justify-center items-center bg-slate-200 rounded-full`}
                    >
                      {item}
                    </Label>
                  );
                })}
              </div>
            </div>
            <div className="py-3 flex gap-4">
              <Button
                variant="none"
                className={`${
                  checkWishlistOrNot == -1 ? "" : "bg-red-500 text-white font-bold"
                } border`}
                onClick={handleWishlist}
              >
                <Heart  className={`${
                  checkWishlistOrNot == -1 ? "" : "fill-red-800"
                } `} />
                WishList
              </Button>
              <Button
                disabled={
                  productDetails.stock === 0 ? true : false || isLoading
                }
                onClick={handleAddToCart}
                variant="outline"
              >
                <ShoppingCart />
                {productDetails.stock === 0 ? "Out of stock" : "Add to Cart"}
              </Button>
            </div>
            <div className="font-semibold">Description</div>
            <div className="text-md text-slate-800">
              {productDetails?.description}
            </div>
            <div className="py-5">
              <Review productDetails={productDetails} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ShoppingDetails;
