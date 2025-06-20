import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { toast } from "sonner";

function AdminHeader({setOpen}) {
  const dispatch = useDispatch()

  function handleLogout() {
    dispatch(logoutUser())
    .then(data => {
      if (data?.payload?.success) {
        toast.success('User logged out successfully!')
      }
    })  
  }
  return (
    <header className="flex justify-between items-center px-4 py-3">
      <Button 
      className={`lg:hidden sm:block bg-gray-950 text-white font-bold`}
      onClick ={()=>setOpen(true)}
      >
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end "></div>
      <Button onClick={handleLogout} className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm bg-gray-950 text-white font-bold shadow ">
        <LogOut /> Logout
         </Button>

    </header>
  );
}

export default AdminHeader;
