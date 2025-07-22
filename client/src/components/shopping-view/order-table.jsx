import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table'
import OrderTableRow from './order-table-row';

const OrderTable = ({ order }) => {
  return <Card>
    <CardHeader>
      <CardTitle className='font-extrabold'>All Orders</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead>Action</TableHead>
            <TableHead><span className='sr-only'>Details</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order && order.length > 0 ? order.map(item => {
            return <OrderTableRow order={item} key={item._id} />
          }) : null}

        </TableBody>
      </Table>
    </CardContent>
  </Card>
}

export default OrderTable
