import Address from "@/components/shopping-view/address";
import img from "../../assets/banner-1.webp";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-item-content";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner"
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createOrder, processPayment } from "@/store/shop-order-slice";
import { Link, useNavigate } from "react-router-dom";
import { fetchCartItems } from "@/store/cart-slice";

function ShoppingCheckout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userAddress, setUserAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);

  const totalSalePrice = cartItems?.items?.reduce((pre, cur) => {
    return pre + cur.salePrice * cur.quantity;
  }, 0);

  const totalPrice = cartItems?.items?.reduce((pre, cur) => {
    return pre + cur.price * cur.quantity;
  }, 0);

  function handleOrder() {
    if (userAddress === null) {
      toast.error("Please select the Address.");
      return;
    }
    if (paymentMethod === null) {
      toast.error("Please select payment method.");
      return;
    }

    const orderData = {
      user: user?.id,
      products: cartItems?.items?.map((item) => {
        return {
          product: item?._id,
          quantity: item?.quantity,
          selectedSize: item?.selectedSize,
        };
      }),
      addressInfo: {
        address: userAddress?.address,
        city: userAddress?.city,
        pincode: userAddress?.pincode,
        phone: userAddress?.phone,
        notes: userAddress?.notes,
      },
      paymentMethod: paymentMethod,
      totalAmount: totalSalePrice,
    };

    if (paymentMethod === "COD") {
      dispatch(createOrder(orderData)).then((data) => {
        if (data.payload.success) {
          toast.success(data.payload.message);
          dispatch(fetchCartItems({ userId: user?.id }));
          navigate("/shop/orders");
        }
      });
    } else if (paymentMethod === "Razorpay") {
      dispatch(processPayment({ totalAmount: totalSalePrice })).then((data) => {
        if (data.payload.success) {
          const options = {
            key: import.meta.env.VITE_ROZORPAY_SECRET_KEY, 
            amount: data.payload.order.amount, 
            currency: "INR",
            name: "Acme Corp",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: data.payload.order.id, 
            handler: function (response) {
              orderData.razorpay_order_id = response.razorpay_order_id;
              orderData.razorpay_payment_id = response.razorpay_payment_id;
              orderData.razorpay_signature = response.razorpay_signature;

              dispatch(createOrder(orderData)).then((data) => {
                if (data.payload.success) {
                  toast.success(data.payload.message);
                  dispatch(fetchCartItems({ userId: user?.id }));
                  navigate("/shop/orders");
                }
              });
            },
            prefill: {
              name: user.userName,
              email: user.email,
              contact: "9000090000",
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };
          var rzp = new Razorpay(options);
          rzp.open();
        }
      });
    }
  }

  return (
    <div className="flex flex-col mt-20">
      <div className=" relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-2">
        <Address setUserAddress={setUserAddress} />
        <Card className="flex flex-col p-2">
          <div className="flex flex-col gap-2">
            {cartItems && cartItems.items && cartItems.items.length > 0 ? (
              cartItems.items.map((Item) => {
                return <UserCartItemsContent key={Item._id} cartItems={Item} />;
              })
            ) : (
              <div>
                <div className="text-lg">No item</div>
                <Link className=" text-blue-600 underline" to={"/shop/listing"}>
                  Go to the listing page
                </Link>
              </div>
            )}
          </div>

          <div>
            {cartItems && cartItems?.items?.length > 0 ? (
              <>
                <Card className="flex flex-col gap-2">
                  <div className="text-sm font-medium mt-[-20px]">
                    Price Details ({cartItems?.length} Items)
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Total MRP</span>
                    <span className="text-sm font-medium">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-green-600">
                      Discount on MRP
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      ₹{totalSalePrice - totalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-md font-semibold">Total Amount</span>
                    <span className="text-md font-semibold">
                      ₹{totalSalePrice}
                    </span>
                  </div>
                </Card>
                <Card className="">
                  <div className="font-medium">Choese the payment method</div>
                  <RadioGroup
                    className="flex"
                    onValueChange={(value) => {
                      setPaymentMethod(value);
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="COD" id="COD" />
                      <Label htmlFor="COD">Cash on delivery</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Razorpay" id="Razorpay" />
                      <Label htmlFor="Razorpay">Razorpay</Label>
                    </div>
                  </RadioGroup>
                </Card>
                <div>
                  {" "}
                  <Button
                    onClick={() => {
                      handleOrder();
                    }}
                    className="w-full mt-2"
                  >
                    Continue
                  </Button>
                </div>
              </>
            ) : null}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
