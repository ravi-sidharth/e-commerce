import { Label } from "@radix-ui/react-dropdown-menu"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/button"


function AddressCart({addressInfo, handleDeleteAddress, handleEditedAddress, setCurrentSelectedAddress,selectedId}) {
    console.log(selectedId,"selectedId")
    return (
        <Card onClick={()=>setCurrentSelectedAddress(addressInfo)} className={`cursor-pointer ${selectedId?._id === addressInfo?._id ? 'border-blue-900 border-4':' border-black'}` }>
            <CardContent className={`grid gap-4 ${selectedId === addressInfo?._id ?'border-black':''}`}>
                <Label><span className="font-bold">Address: </span> {addressInfo?.address}</Label>
                <Label><span className="font-bold">City: </span>{addressInfo?.city}</Label>
                <Label><span className="font-bold">Pin Code: </span>{addressInfo?.pincode}</Label>
                <Label><span className="font-bold">Phone Number: </span>{addressInfo?.phone}</Label>
                <Label><span className="font-bold">Notes: </span>{addressInfo?.notes}</Label>
            </CardContent>
            <CardFooter className=" flex justify-between ">
                <Button onClick={()=>handleEditedAddress(addressInfo)} className="bg-gray-950 font-bold text-white">Edit</Button>
                <Button onClick={()=>handleDeleteAddress(addressInfo)} className="bg-gray-950 font-bold text-white">Delete</Button>
            </CardFooter>
        </Card>
    )
}

export default AddressCart