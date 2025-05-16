import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";

function AdminHeader({setOpen}) {
  return (
    <header className="flex justify-between items-center px-4 py-3 border-b">
      <Button 
      className={`lg:hidden sm:block bg-gray-700 text-white`}
      onClick ={()=>setOpen(true)}
      >
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end "></div>
      <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm bg-gray-700 text-white font-medium shadow ">
        <LogOut /> Logout
         </Button>

    </header>
  );
}

export default AdminHeader;
