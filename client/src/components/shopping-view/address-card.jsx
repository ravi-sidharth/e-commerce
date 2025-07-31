import React from "react";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setUserAddress,
  selecteAddress,
  setSelecteAddress,
}) => {

  console.log(addressInfo._id,"address info Id")
  console.log(selecteAddress,"selected Adress")
  return (
    <Card
      className={`${addressInfo?._id === selecteAddress ? " border border-black bg-gray-200" : "bg-gray-200 shadow-2xl"}`}
      onClick={() => {
        if (setUserAddress) {
          setUserAddress({
            addressId: addressInfo?._id,
            address: addressInfo?.address,
            city: addressInfo?.city,
            pincode: addressInfo?.pincode,
            phone: addressInfo?.phone,
            notes: addressInfo?.notes,
          });
          setSelecteAddress(addressInfo?._id);
        }
      }}
    >
      <CardHeader className="grid gap-2 p-2 text-sm">
        <Label>Address : {addressInfo?.address}</Label>
        <Label>City : {addressInfo?.city}</Label>
        <Label>Pincode : {addressInfo?.pincode}</Label>
        <Label>Phone : {addressInfo?.phone}</Label>
        <Label>Notes : {addressInfo?.notes}</Label>
      </CardHeader>
      <CardFooter className="mt-[-20px] flex justify-end gap-3">
        <Button size="sm" onClick={() => handleEditAddress(addressInfo)}>
          Edit
        </Button>
        <Button className="bg-red-500" size="sm" onClick={() => handleDeleteAddress(addressInfo)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
