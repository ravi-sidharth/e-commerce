import AdminHeader from "@/components/admin-view/Header";
import AdminSidebar from "@/components/admin-view/Sidebar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* Admin Sidebar */}
      <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="h-screen w-full overflow-auto relative">
        <AdminHeader setOpen={setOpenSidebar} />
        <main className="p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
