import React, { useState } from "react";
import { Label } from "../ui/label";
import { DialogContent } from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useDispatch } from "react-redux";
import {
  fetchAllOrder,
  fetchOrderDetailsById,
  updateOrderStatus,
} from "@/store/admin-order-slice";
const initailFormData = {
  orderStatus: "",
};
const AdminOrderDetailsView = ({ orderDetails }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initailFormData);
  function handleUpdateStatus(e) {
    e.preventDefault();

    dispatch(updateOrderStatus({ orderId: orderDetails._id, formData })).then(
      (data) => {
        if (data.payload.success) {
          dispatch(fetchOrderDetailsById(orderDetails._id));
          dispatch(fetchAllOrder());
          setFormData(initailFormData);
        }
      }
    );
  }

  return (
    <DialogContent
      aria-describedby={undefined}
      className="sm:max-w-[600px] h-[80%] overflow-auto bg-white border-none"
    >
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="font-medium text-center text-lg">Order Details</div>

          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order id</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.createdAt.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>
              <Badge
                className={`${
                  orderDetails?.paymentStatus == "Paid"
                    ? "bg-green-600"
                    : "bg-black "
                } text-white font-bold rounded-full`}
              >
                {orderDetails?.paymentStatus}
              </Badge>
            </Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`font-bold text-white rounded-full ${orderDetails?.orderStatus=='Delivered' ? 'bg-green-500': orderDetails?.orderStatus==="Cancelled"? 'bg-red-500':'bg-black'}`}
              >
              {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Total Amount</p>
            <Label>₹{orderDetails?.totalAmount}</Label>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium text-center text-lg">
                Product Details
              </div>
              <ul className="grid gap-3">
                {orderDetails?.products.map((item) => {
                  return (
                    <li
                      key={item._id}
                      className="flex items-center justify-between"
                    >
                      <span>
                        Title :{" "}
                        {item?.product?.title
                          ?.split(" ")
                          .slice(0, 3)
                          .join(" ")
                          .concat(".....")}
                      </span>
                      <span>Size : {item?.selectedSize}</span>
                      <span>Quantity : {item?.quantity}</span>
                      <span>
                        Price : ₹{item?.product?.salePrice * item?.quantity}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium text-center text-lg">
                Shipping Info
              </div>
              <div className="grid gap-0.5">
                <span>Address : {orderDetails?.addressInfo?.address}</span>
                <span>city : {orderDetails?.addressInfo?.city}</span>
                <span>pincode : {orderDetails?.addressInfo?.pincode}</span>
                <span>phone : {orderDetails?.addressInfo?.phone}</span>
                <span>notes : {orderDetails?.addressInfo?.notes}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={handleUpdateStatus}>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select

                  value={formData.orderStatus}
                  onValueChange={(value) => {
                    setFormData({ ...formData, orderStatus: value });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button
                  disabled={formData.orderStatus === ""}
                  className="w-full"
                >
                  Update Order Status
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;
