import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrdersDetailsView from "./orders.details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUser, getOrdersDetail, resetOrderDetails } from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);
  const dispatch = useDispatch();

  function hanldeFetchOrderDetails(getCurrentOrderId) {
    dispatch(getOrdersDetail(getCurrentOrderId)).then(data=> {
      console.log(data,"order details")
      if (data?.payload?.success) {
      }
    })
    setOpenDetailsDialog(true)
  }

  useEffect(() => {
    dispatch(getAllOrdersByUser(user?.id)).then((data) => {
      console.log(data, "order list");
    });
  }, [dispatch]);

  useEffect(()=> {
    if(orderDetails !== null ) setOpenDetailsDialog(true)
  },[orderDetails])

  console.log(orderList, "order Details");

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="text-4xl"> Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="">
          <TableHeader>
            <TableRow className="border-none ">
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow className="border-none">
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{(orderItem?.orderDate).split('T')[0]}</TableCell>
                    <TableCell>
                      <Badge className={`font-bold text-white rounded-full ${orderItem?.orderStatus=='Confirmed' ? 'bg-green-500':'bg-black'}`}>{orderItem?.orderStatus}</Badge>
                    </TableCell>
                    <TableCell>${orderItem?.totalAmount}</TableCell>
                    <TableCell>{}</TableCell>
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={()=> {
                        setOpenDetailsDialog(false)
                        dispatch(resetOrderDetails())
                      }}
                    >
                      <Button
                       onClick={()=>hanldeFetchOrderDetails(orderItem?._id)}
                        className="bg-gray-950 text-white font-bold m-3"
                      >
                        View Details
                      </Button>
                      <ShoppingOrdersDetailsView orderDetails={orderDetails} userName ={user?.userName} />
                    </Dialog>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
