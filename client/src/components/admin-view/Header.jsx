import React from "react";
import { Button } from "../ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { userLogout } from "@/store/auth-slice";
import { toast } from "sonner"
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ setOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(userLogout()).then((data) => {
      if (data.payload.success) {
        toast.success(data.payload.message,);
        sessionStorage.setItem("token", "");
        navigate("/login");
      }
    });
  };
  return (
    <header className="flex bg-white z-50 items-center justify-center px-4 py-1.5 border border-b sticky top-0">
      <Button
        onClick={() => {
          setOpen(true);
        }}
        className="lg:hidden"
      >
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={logoutHandler}
          size={"sm"}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
