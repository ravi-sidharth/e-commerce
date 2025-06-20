import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";


function PaypalReturnPage() {

    const dispatch = useDispatch()
    const loacation = useLocation()
    const params = new URLSearchParams(loacation.search)
    const paymentId = params.get('token')
    const payerId = params.get('PayerID')

    useEffect(()=> {
        if(paymentId && payerId) {
            const orderId = JSON.parse(sessionStorage.getItem('currentCartId'))

            dispatch(capturePayment({paymentId,payerId,orderId})).then(data=> {
                if(data?.payload?.success) {
                    sessionStorage.removeItem('getCurrentOrderId')
                    window.location.href = '/shop/payment-success '
                }
            })
        }
    },[dispatch,paymentId,payerId])

    return(
        <Card className="border-none">
            <CardHeader>
                <CardTitle>Processing payment... Please wait!</CardTitle>
            </CardHeader>
        </Card>
    )
}

export default PaypalReturnPage;

