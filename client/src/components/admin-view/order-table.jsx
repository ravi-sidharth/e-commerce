import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderTableRow from "./order-table-row";
const AdminOrdersTable = ({ orderList }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow >
            <TableHead>Order ID</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead >Action</TableHead>
            <TableHead>
              <span className="sr-only">Details</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderList && orderList.length > 0
            ? orderList.map((item) => {
                return <AdminOrderTableRow orderItem={item} key={item._id} />;
              })
            : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminOrdersTable;
