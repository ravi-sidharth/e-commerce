import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({cartItems}) {
  return (
    <SheetContent className="sm:max-w-md bg-white">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="px-4">
        <div className="space-y-4">
          {
            cartItems && cartItems.length > 0 ? 
            cartItems.map(item=><UserCartItemsContent cartItem={item} />):null
          }
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">$1000</span>
          </div>
        </div>
        <Button className="w-full mt-5 bg-gray-950 text-white font-bold">
          Checkout
        </Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
