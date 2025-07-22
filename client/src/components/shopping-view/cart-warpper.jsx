import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import UserCartItemsContent from './cart-item-content'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

const UserCartWrapper = ({ isLoading, cartItems, setOpenCartSheet }) => {
    const navigate = useNavigate();
    
    const totalSalePrice = cartItems.reduce((pre, cur) => {
        return pre + cur.salePrice * cur.quantity
    }, 0);

    const totalPrice = cartItems.reduce((pre, cur) => {
        return pre + cur.price * cur.quantity
    }, 0);

    return (
        <SheetContent aria-describedby={undefined} className='sm:max-w-md bg-white z-50 border-no'>
            <div className='h-full overflow-y-auto pe-3'>
                <SheetHeader>
                    <SheetTitle className='font-extrabold text-3xl'>Your Cart</SheetTitle>
                </SheetHeader>
                <div className=' space-y-2'>
                    {cartItems && cartItems.length > 0 ? cartItems.map(Item => {
                        return <UserCartItemsContent key={Item._id} cartItems={Item} />
                    }) : <p className="text-gray-600 text-md font-semibold my-1 px-6">No Cart Found</p>}
                </div>

                {cartItems && cartItems.length > 0 ?<><div className="mt-8 space-y-1 px-2">
                    <div className="text-sm font-medium">Price Details ({cartItems?.length} Items)</div>

                    <div className="flex justify-between">
                        <span className="text-sm font-medium">Total MRP</span>
                        <span className="text-sm font-medium">₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm font-medium text-green-600">Discount on MRP</span>
                        <span className="text-sm font-medium text-green-600">₹{totalSalePrice - totalPrice}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                        <span className="text-md font-semibold">Total Amount</span>
                        <span className="text-md font-semibold">₹{totalSalePrice}</span>
                    </div>

                </div> <div className='px-2'> <Button onClick={() => {
                    navigate('/shop/checkout')
                    setOpenCartSheet(false)
                }} className='w-full mt-6'>Checkout</Button></div></> : null}

            </div>
        </SheetContent>
    )
}

export default UserCartWrapper
