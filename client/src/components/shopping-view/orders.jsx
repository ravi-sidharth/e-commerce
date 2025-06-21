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
import { ArrowLeft, ArrowRight } from "lucide-react";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 8
  const start = (currentPage - 1 ) * perPage
  const end  = start + perPage
  const dispatch = useDispatch();

  const goToNextPage = () => {
    setCurrentPage(prev => prev+1)
  }

  const goToPreviosPage = () => {
    setCurrentPage(prev => prev-1)
  }

  function hanldeFetchOrderDetails(getCurrentOrderId) {
    dispatch(getOrdersDetail(getCurrentOrderId)).then(data=> {
      if (data?.payload?.success) {
      }
    })
    setOpenDetailsDialog(true)
  }

  useEffect(() => {
    dispatch(getAllOrdersByUser(user?.id)).then((data) => {
    });
  }, [dispatch]);

  useEffect(()=> {
    if(orderDetails !== null ) setOpenDetailsDialog(true)
  },[orderDetails])

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
              ? orderList.slice(start,end).map((orderItem) => (
                  <TableRow className="border-none">
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{(orderItem?.orderDate).split('T')[0]}</TableCell>
                    <TableCell>
                    <Badge className={`font-bold text-white rounded-full ${orderItem?.orderStatus=='Confirmed' ? 'bg-green-500':orderItem?.orderStatus==='rejected' ?'bg-red-500':'bg-black'}`}>{orderItem?.orderStatus}</Badge>
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
        <div className="flex justify-end w-[87%] items-center mt-5 cursor-pointer gap-1">
          <div className={`${currentPage===1 ? "cursor-not-allowed opacity-50":""}`}  onClick={currentPage ===1 ? null : goToPreviosPage}  ><ArrowLeft className="w-8 h-8 rounded-md border" /></div>
          <div className="text-xl w-8 h-8 flex justify-center items-center rounded-md border"><span>{currentPage}</span></div>
          <div className={`${currentPage === Math.ceil(orderList.length / perPage) ? 'cursor-not-allowed opacity-50' :''}`} onClick={currentPage === Math.ceil(orderList.length / perPage) ? null : goToNextPage} ><ArrowRight className="w-8 h-8 rounded-md border" /></div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
