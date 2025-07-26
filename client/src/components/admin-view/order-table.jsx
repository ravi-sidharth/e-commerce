import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderTableRow from "./order-table-row";
import Pagination from "../common/Pagination";
const AdminOrdersTable = ({ orderList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((orderList.length) / 10);
  const start = (currentPage - 1) *10 
  const end = start + 10 
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>
              <span className="sr-only">Details</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderList && orderList.length > 0
            ? orderList.slice(start,end).map((item) => {
                return <AdminOrderTableRow orderItem={item} key={item._id} />;
              })
            : null}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AdminOrdersTable;
