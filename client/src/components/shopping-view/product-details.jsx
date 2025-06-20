import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { setProductsDetail } from "@/store/shop/product-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addProductReview, getProductReview } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const dispatch = useDispatch();

  function handleRatingChange(getRating) {
    setRating(getRating);
  }
  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );

      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;

        if (getQuantity + 1 > getTotalStock) {
          toast.error(
            `Only ${getQuantity} quantity can be added for this item`
          );
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product is added to cart");
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductsDetail());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addProductReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0)
        setReviewMsg("")
        dispatch(getProductReview(productDetails?._id));
        toast.success("Review added successfully!");
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null)
      dispatch(getProductReview(productDetails?._id));
  }, [productDetails]);

  const averageReview = reviews && reviews.length >0 ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length : 0

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] bg-white">
        <div className="relative rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={400}
            height={400}
            className="aspect-square w-full object-contain"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-sm lg:text-lg font-extrabold mb-5">
              {productDetails?.title}
            </h1>
            <p className="text-xs lg:text-sm text-gray-700 ">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between mt-5">
            <p
              className={`text-[12px] sm:text-3xl font-bold ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold">${productDetails?.salePrice}</p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-gray-500">({averageReview.toFixed(2)})</span>
          </div>
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="bg-zinc-900 w-full text-white font-bold opacity-60 cursor-not-allowed">
                Out Of Stock
              </Button>
            ) : (
              <Button
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
                className="bg-zinc-900 w-full text-white font-bold"
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator className="w-6 h-8 bg-gray-400" />
          <div className="max-h-[300px] overflow-auto ">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4 ">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {reviewItem.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                          <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-zinc-500">
                        {reviewItem?.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>
            <div className="mt-10 flex flex-col gap-2">
              <Label>Write a review</Label>
              <div className="flex">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMessage"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="write a review..."
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
                className="bg-gray-950 text-white font-bold"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
