import AccountImage from "../../assets/banner-1.webp";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrderByUserId } from "@/store/shop-order-slice";
import OrderTable from "@/components/shopping-view/order-table";

function ShoppingOrder() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchAllOrderByUserId(user?.id));
  }, [dispatch]);

  const { orderList } = useSelector((state) => state.shopOrder);

  return (
    <div className="flex flex-col">
      <div className="relative h-[350px] w-full overflow-hidden">
        <img
          src={AccountImage}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="py-6 px-2 md:px-20">
        <OrderTable order={orderList} />
      </div>
    </div>
  );
}

export default ShoppingOrder;
