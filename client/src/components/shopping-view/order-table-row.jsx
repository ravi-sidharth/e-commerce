import React, { useState } from 'react'
import { TableCell, TableRow } from '../ui/table'
import ShoppingOrderDetailsView from './order-details'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderDetailsById } from '@/store/shop-order-slice'
import { Badge } from '../ui/badge'

const OrderTableRow = ({ order }) => {
  const dispatch = useDispatch();
  const { orderDetails } = useSelector(state => state.shopOrder);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  function handleOrderDetails(getOrderId) {
    setOpenDetailsDialog(true)
    dispatch(fetchOrderDetailsById(getOrderId));
  }
  
  return <TableRow key={order._id}>
    <TableCell>{order._id}</TableCell>
    <TableCell>{order.createdAt.split('T')[0]}</TableCell>
    <TableCell>
      <Badge className={`font-bold text-white border-2 rounded-full ${order?.orderStatus=='Delivered' ? 'bg-green-500': order?.orderStatus==="Cancelled"? 'bg-red-500':'bg-black'}`} >{order.orderStatus}</Badge>
    </TableCell>
    <TableCell>₹{order.totalAmount}</TableCell>
    <TableCell>
      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <Button onClick={() => handleOrderDetails(order._id)}>View Details</Button>
        {orderDetails && orderDetails !== null ? <ShoppingOrderDetailsView orderDetails={orderDetails} /> : null}
      </Dialog>
    </TableCell>
  </TableRow>
}

export default OrderTableRow
