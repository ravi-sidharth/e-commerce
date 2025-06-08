import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import { toast } from "sonner";
import AddressCart from "./address-cart";

const initialFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};
function Address() {
  const [formData, setFormData] = useState(initialFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addresses } = useSelector((state) => state.shopAddress);

  function handleManageAddress(event) {
    event.preventDefault();

    if (addresses.length >= 3 && currentEditedId === null ) {
      toast.error('You can add max 3 addresses.')
      setFormData(initialFormData)
      return 
    }

    currentEditedId !== null
      ? dispatch(
          editaAddress({ userId: user.id, addressId: currentEditedId, formData })
        ).then((data) => {
          if (data?.payload?.success) {
            toast.success("Address edited successfully!.");
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialFormData);
            setCurrentEditedId(null)
          }
        })
      : dispatch(addNewAddress({ ...formData, userId: user?.id })).then(
          (data) => {
            console.log(data, "Data");
            if (data?.payload?.success) {
              toast.success("Address added successfully!");
              dispatch(fetchAllAddresses(user?.id));
              setFormData(initialFormData);
            }
          }
        );
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress?._id })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Address deleted successfully!");
        dispatch(fetchAllAddresses(user?.id));
      }
    });
  }

  function handleEditedAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  return (
    <Card className="border-none">
      <div className="mb-5 p-3  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {addresses && addresses.length > 0
          ? addresses.map((address) => (
              <AddressCart
                addressInfo={address}
                handleDeleteAddress={handleDeleteAddress}
                handleEditedAddress={handleEditedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
