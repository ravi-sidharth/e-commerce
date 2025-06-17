import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from "@/store/admin/order-slice";
import { toast } from "sonner";

const initialFormData = {
  status: "",
};

function AdminOrderDetailView({orderDetails,userName}) {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(initialFormData);

  function handleUpdateStatus(event) {
    const {status} = formData
    
    event.preventDefault()

    dispatch(updateOrderStatus({id: orderDetails?._id , orderStatus:status})).then(data=> {
      if (data?.payload?.success) {
        toast.success('Order status updated successfully')
        dispatch(getOrderDetailsForAdmin(orderDetails?._id))
        dispatch(getAllOrdersForAdmin())
        setFormData(initialFormData)
      }
    })

  }

  return (
    <DialogContent className="sm:max-w-[600px]  bg-white">
      <div className="grid gap-6 ">
      <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{new Date(orderDetails?.orderDate).toLocaleDateString()}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Amount</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex items-center justify-between ">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge className={`font-bold text-white rounded-full ${orderDetails?.orderStatus=='Confirmed' ? 'bg-green-500': orderDetails?.orderStatus==="rejected"? 'bg-red-500':'bg-black'}`}>{orderDetails?.orderStatus}</Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3 ">
              {
                orderDetails && orderDetails.cartItems && orderDetails.cartItems.length > 0 ?
                orderDetails?.cartItems.map(item => (
                  <li className="flex items-center justify-between">
                  <span>Title: {item?.title}</span>
                  <span>Qunatity: {item?.quantity}</span>
                  <span>Price: ${item?.price }</span>
                </li>
                )) : null
              }
             
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5">
              <span>{userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>

        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailView;
