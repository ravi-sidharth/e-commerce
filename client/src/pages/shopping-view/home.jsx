import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton"


function ShoppingHome() {
  const { isLoading } = useSelector((state) => state.auth);
  if (isLoading) {
    return (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gray-300" />
        </div>
      )
  }
  return <div className="" > Shopping home page</div>;
}

export default ShoppingHome;
