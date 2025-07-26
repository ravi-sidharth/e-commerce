import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table'
import OrderTableRow from './order-table-row';
import Pagination from '../common/Pagination';

const OrderTable = ({ order }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((order.length) / 10);
  const start = (currentPage - 1) *10 
  const end = start + 10 
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
          {order && order.length > 0 ? order.slice(start,end).map(item => {
            return <OrderTableRow order={item} key={item._id} />
          }) : null}

        </TableBody>
      </Table>
    </CardContent>
    <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
  </Card>
}

export default OrderTable
