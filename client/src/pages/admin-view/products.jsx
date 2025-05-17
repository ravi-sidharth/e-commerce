import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useState } from "react";

const initialFormData = {
  image: "",
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const onSubmit = () => {};

  return (
    <>
      <div className="w-full flex justify-end">
        <Button
          onClick={() => setOpenCreateProductsDialog(true)}
          className="bg-gray-600 text-white "
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet
        className=""
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
        }}
      >
        <SheetContent
          side="right"
          className="overflow-auto bg-white z-50 shadow-lg "
        >
          <SheetHeader>
            <SheetTitle className="text-2xl">Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState ={setImageLoadingState}
          />
          <div className="px-6 mb-5">
            <CommonForm
              onSubmit={onSubmit}
              buttonText={"Add"}
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AdminProducts;
