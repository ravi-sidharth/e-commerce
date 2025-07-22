import ShoppingProductItem from "@/components/shopping-view/Product-item";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner"
import { createWishlist, fetchAllWishlist } from "@/store/wishlist-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { isLoading, wishlistList } = useSelector(
    (state) => state.shopWishlist
  );
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchAllWishlist(user.id));
  }, [dispatch]);

  function handleDelete(getItemsId) {
    dispatch(createWishlist({ userId: user.id, productId: getItemsId })).then(
      (data) => {
        if (data.payload.success) {
          toast.success(data.payload.message);
          dispatch(fetchAllWishlist(user.id));
        } else{
          toast.error(data.payload.message);
        }
      }
    );
  }

  return (
    <div className="py-12 px-2 md:px-20">
      <div>
        {wishlistList && wishlistList.length > 0 ? (
          <>
            <div className="font-extrabold my-5 text-lg">
              My Wishlist {wishlistList.length} items
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-6">
              {isLoading
                ? Array(10)
                    .fill(null)
                    .map((_, index) => (
                      <div key={index} className="flex flex-col space-y-3">
                        <Skeleton className="h-[300px] w-full rounded-xl" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full]" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      </div>
                    ))
                : wishlistList.map((item) => {
                    return (
                      <ShoppingProductItem
                        handleDelete={handleDelete}
                        product={item}
                        key={item._id}
                      />
                    );
                  })}
            </div>
          </>
        ) : (
          <div className=" text-center mt-48">No wishlist</div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
