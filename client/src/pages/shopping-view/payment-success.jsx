import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"


function PaymentSuccessPage() {
    const navigate = useNavigate()
    return  <Card className="border-none p-10">
    <CardHeader className="p-0">
        <CardTitle className="text-4xl">Payment is successful!</CardTitle>
    </CardHeader>
    <div>
    <Button className=" bg-gray-950 font-bold text-white" onClick = {()=>navigate('/shop/account')}>View Orders</Button>
    </div>
</Card>
}

export default PaymentSuccessPage