import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

const MenuItems = ({setOpen}) => {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path)
            setOpen ? setOpen(false) : null
          }} 
          className="flex items-center gap-2 rounded-md px-3 py-2 text-xl text-muted-foreground hover:bg-muted hover:text-gray-400 cursor-pointer "
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
};

function AdminSideBar({ open, setOpen }) {
    const navigate = useNavigate();
  
    return (
      <>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="w-64 bg-white z-50 shadow-lg">
            <div className="flex flex-col h-full">
              <SheetHeader className="border-b">
                <SheetTitle className="flex gap-2 mt-[-7px]">
                  <ChartNoAxesCombined size={30} />
                  <h1 className="text-2xl font-extrabold">Admin Panel</h1>
                </SheetTitle>
              </SheetHeader>
              <MenuItems setOpen={setOpen} />
            </div>
          </SheetContent>
        </Sheet>
  
        {/* Permanent sidebar for larger screens */}
        <aside className="hidden w-64 flex-col border-r p-6 lg:flex">
          <div
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <ChartNoAxesCombined size={30} />
            <h1 className="text-2xl font-extrabold">Admin Panel</h1>
          </div>
          <MenuItems />
        </aside>
      </>
    );
  }
  

export default AdminSideBar;
