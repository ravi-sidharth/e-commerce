import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImage from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";

function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      <div className="relatice h-[300px] w-full overflow-hidden">
        <img
          src={accImage}
          alt="Account image"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-8 p-6">
        <div className="flex flex-col rounded-lg p-4 border-white/50 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
                <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
                <Address/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
