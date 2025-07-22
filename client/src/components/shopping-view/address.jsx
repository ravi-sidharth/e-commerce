import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addressSchema } from "@/config/validationSechma";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  fetchAddress,
  updateAddress,
} from "@/store/address-slice";
import { toast } from "sonner";
import AddressCard from "./address-card";
import { Textarea } from "../ui/textarea";

const initialState = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};

const Address = ({ setUserAddress }) => {
  const [selecteAddress, setSelecteAddress] = useState(null);
  const dispatch = useDispatch();
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialState);

  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  useEffect(() => {
    dispatch(fetchAddress(user?.id));
  }, [dispatch]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (addressList.length >= 2 && currentEditedId === null) {
      toast.warning("You can add only 2 address");
      setFormData(initialState);
      return;
    }

    const checkValidation = addressSchema.safeParse(formData);
    if (!checkValidation.success) {
      setErrors(checkValidation.error.formErrors.fieldErrors);
      return;
    }
    const action =
      currentEditedId === null
        ? addAddress({ ...formData, userId: user?.id })
        : updateAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          });
    dispatch(action).then((data) => {
      if (data.payload.success) {
        toast.success(data.payload.message);
        setErrors({});
        setFormData(initialState);
        setCurrentEditedId(null);
        dispatch(fetchAddress(user?.id));
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress._id);
    setFormData({ ...getCurrentAddress });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress?._id })
    ).then((data) => {
      if (data.payload.success) {
        dispatch(fetchAddress(user?.id));
        toast.success(data.payload.message);
      }
    });
  }

  return (
    <Card className="p-2">
      <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((addressItem) => {
              return (
                <AddressCard
                  selecteAddress={selecteAddress}
                  setSelecteAddress={setSelecteAddress}
                  setUserAddress={setUserAddress}
                  handleDeleteAddress={handleDeleteAddress}
                  handleEditAddress={handleEditAddress}
                  key={addressItem._id}
                  addressInfo={addressItem}
                />
              );
            })
          : null}
      </div>
      <CardHeader className="p-1 text-xl font-bold text-center">
        {currentEditedId === null ? "Add New Address" : "Edit Address"}
      </CardHeader>
      <CardContent className="space-y-1">
        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor={"address"}>Address</Label>
              <Input
                type="text"
                name="address"
                onChange={handleChange}
                placeholder="Enter the address"
                value={formData.address}
                className="border"
              />
              {errors?.address && (
                <p className="text-red-600">{errors.address[0]}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor={"city"}>City</Label>
              <Input
                type="text"
                name="city"
                onChange={handleChange}
                placeholder="Enter the city"
                value={formData.city}
                className="border"
              />
              {errors?.city && <p className="text-red-600">{errors.city[0]}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor={"pincode"}>Pincode</Label>
              <Input
                type="text"
                name="pincode"
                onChange={handleChange}
                placeholder="Enter the pincode"
                value={formData.pincode}
                className="border"
              />
              {errors?.pincode && (
                <p className="text-red-600">{errors.pincode[0]}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor={"phone"}>Phone</Label>
              <Input
                type="text"
                name="phone"
                onChange={handleChange}
                placeholder="Enter the phone"
                value={formData.phone}
                className="border"
              />
              {errors?.phone && (
                <p className="text-red-600">{errors.phone[0]}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor={"notes"}>Notes</Label>
              <Textarea
                name="notes"
                value={formData.notes}
                placeholder="Enter the notes"
                onChange={handleChange}
              ></Textarea>
              {errors?.notes && (
                <p className="text-red-600">{errors.notes[0]}</p>
              )}
            </div>
            <div>
              <Button className="w-full">
                {currentEditedId === null ? "Add" : "Edit"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Address;
