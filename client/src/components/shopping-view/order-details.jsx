import React from 'react'
import { Label } from '../ui/label'
import { DialogContent } from '../ui/dialog'
import { Badge } from '../ui/badge'

const ShoppingOrderDetailsView = ({ orderDetails }) => {
    return <DialogContent aria-describedby={undefined} className='sm:max-w-[600px] h-[80%] bg-white'>
        <div className='grid gap-6'>
            <div className='grid gap-2'>
                <div className='font-medium text-center text-lg'>Order Details</div>

                <div className='flex mt-6 items-center justify-between'>
                    <p className='font-medium'>Order id</p>
                    <Label>{orderDetails?._id}</Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Order Date</p>
                    <Label>{orderDetails?.createdAt.split('T')[0]}</Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Payment Method</p>
                    <Label >{orderDetails?.paymentMethod}</Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Payment Status</p>
                    <Label><Badge className={`${orderDetails.paymentStatus == 'confirmed' ? 'bg-green-600 ' : 'bg-black '} text-white rounded-full`} >{orderDetails.paymentStatus}</Badge></Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Order Status</p>
                    <Label><Badge className={`font-bold text-white rounded-full ${orderDetails?.orderStatus=='Delivered' ? 'bg-green-500': orderDetails?.orderStatus==="Cancelled"? 'bg-red-500':'bg-black'}`} >{orderDetails.orderStatus}</Badge></Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Total Amount</p>
                    <Label>₹{orderDetails?.totalAmount}</Label>
                </div>
                <div className='grid gap-4'>
                    <div className='grid gap-2'>
                        <div className='font-medium text-center text-lg'>Product Details</div>
                        <ul className='grid gap-3'>
                            {orderDetails?.products.map(item => {
                                return <li key={item._id} className='flex items-center justify-between'>
                                    <span>Title : {item?.product?.title?.split(' ').slice(0, 3).join(' ').concat('.....')}</span>
                                    <span>Size : {item?.selectedSize}</span>
                                    <span>Quantity : {item?.quantity}</span>
                                    <span>Price : ₹{item?.product?.salePrice * item?.quantity}</span>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
                <div className='grid gap-4'>
                    <div className='grid gap-2'>
                        <div className='font-medium text-center text-lg'>Shipping Info</div>
                        <div className='grid gap-0.5'>
                            <span>Address : {orderDetails?.addressInfo?.address}</span>
                            <span>city : {orderDetails?.addressInfo?.city}</span>
                            <span>pincode : {orderDetails?.addressInfo?.pincode}</span>
                            <span>phone : {orderDetails?.addressInfo?.phone}</span>
                            <span>notes : {orderDetails?.addressInfo?.notes}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </DialogContent>
}

export default ShoppingOrderDetailsView
