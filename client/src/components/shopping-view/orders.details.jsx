import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";



function ShoppingOrdersDetailsView({orderDetails,userName}) {
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
          <div className="flex items-center justify-between ">
            <p className="font-medium">Order Status</p>
            <Label><Badge className={`font-bold text-white rounded-full ${orderDetails?.orderStatus=='Confirmed' ? 'bg-green-500':'bg-black'}`}>{orderDetails?.orderStatus}</Badge></Label>
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
                  <span>{item?.title}</span>
                  <span>{item?.quantity}</span>
                  <span>{item?.price }</span>
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
      </div>
    </DialogContent>
  );
}

export default ShoppingOrdersDetailsView;
