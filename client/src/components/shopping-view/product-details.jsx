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

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const {user} = useSelector(state=>state.auth)
  const dispatch = useDispatch()
  function handleAddToCart(getCurrentProductId) {
    console.log(getCurrentProductId, "getCurrentProductId");
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      console.log(data, "addToCart Data");
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success('Product is added to cart')

      }
    });
  }

  function handleDialogClose() {
    setOpen(false)
    dispatch(setProductsDetail())
  }
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
              {" "}
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold">${productDetails?.salePrice}</p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-gray-800" />
              <StarIcon className="w-5 h-5 fill-gray-800" />
              <StarIcon className="w-5 h-5 fill-gray-800" />
              <StarIcon className="w-5 h-5 fill-gray-800" />
              <StarIcon className="w-5 h-5 fill-gray-800" />
            </div>
            <span className="text-gray-500">(4.5)</span>
          </div>
          <div className="mt-5 mb-5">
            <Button onClick={()=> handleAddToCart(productDetails?._id)} className="bg-zinc-900 w-full text-white font-bold">
              Add to Cart
            </Button>
          </div>
          <Separator className="w-6 h-8 bg-gray-400" />
          <div className="max-h-[300px] overflow-auto ">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              <div className="flex gap-4 ">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Ravi Kumar</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                  </div>
                  <p className="text-zinc-500">This is an awesome product</p>
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="flex gap-4 ">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Ravi Kumar</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                  </div>
                  <p className="text-zinc-500">This is an awesome product</p>
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="flex gap-4 ">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Ravi Kumar</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                  </div>
                  <p className="text-zinc-500">This is an awesome product</p>
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="flex gap-4 ">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Ravi Kumar</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                  </div>
                  <p className="text-zinc-500">This is an awesome product</p>
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="flex gap-4 ">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Ravi Kumar</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                    <StarIcon className="w-5 h-5 fill-gray-800" />
                  </div>
                  <p className="text-zinc-500">This is an awesome product</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Input placeholder="write a review..." />
              <Button className="bg-gray-950 text-white font-bold">Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
