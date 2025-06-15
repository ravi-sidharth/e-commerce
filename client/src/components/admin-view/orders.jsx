import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { useEffect, useState } from "react";
import AdminOrderDetailView from "./orders-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const {orderList, orderDetails} = useSelector(state=>state.adminOrder)
  const {user} = useSelector(state=>state.auth)
  const dispatch = useDispatch()

  const hanldeFetchOrderDetails = (getId) => {
    dispatch(getOrderDetailsForAdmin(getId))
  }

  useEffect(()=> {
    dispatch(getAllOrdersForAdmin())
  },[dispatch])

  useEffect(()=> {
    if(orderDetails !== null) setOpenDetailsDialog(true)
  },[orderDetails])

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-zinc-100">
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
                      <AdminOrderDetailView orderDetails={orderDetails} userName ={user?.userName} />
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

export default AdminOrdersView;
