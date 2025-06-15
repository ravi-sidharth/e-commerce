import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/product-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialFormData = {
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
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { products } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    if (currentEditedId) {
      console.log(currentEditedId, "currentEdited Id");
      dispatch(
        editProduct({
          id: currentEditedId,
          formData: {
            ...formData,
            image: uploadedImageUrl,
          },
        })
      ).then((data) => {
        console.log(data, "product");
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setImageFile(null);
          setOpenCreateProductsDialog(false);
          setFormData(initialFormData);
          setCurrentEditedId(null);
          toast.success("successfully edited product");
        } else {
          toast.error("All feilds are required!");
        }
      });
    } else {
      dispatch(
        addNewProduct({
          ...formData,
          image: uploadedImageUrl,
        })
      ).then((data) => {
        console.log(data, "product");
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setImageFile(null);
          setOpenCreateProductsDialog(false);
          setFormData(initialFormData);
          uploadedImageUrl("");
          toast.success("successfully added new product");
        } else {
          toast.error("All fields are required!");
        }
      });
    }
  };

  function handleDelete(getProductId) {
    console.log(getProductId,"productId")

    dispatch(deleteProduct(getProductId)).then((data)=>{
      console.log(data,"deleted product")
      if (data?.payload?.success) {
        dispatch(fetchAllProducts())
        toast.success('Successfully deleted the product!')
      }
    })
  }

  console.log(formData, "FormData");

  function isFormValid() {
    return Object.keys(formData)
      .map(key => formData[key] !== "")
      .every(item => item);
  }
  const valid = isFormValid()
  console.log(valid,"isFOrmValid")

  useEffect(() => {isFormValid
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <>
      <div className="w-full flex justify-end mb-5 ">
        <Button
          onClick={() => setOpenCreateProductsDialog(true)}
          className="bg-gray-950 text-white font-bold"
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products && products.length > 0
          ? products.map((product) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={product}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        className=""
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setFormData(initialFormData);
          setCurrentEditedId(null);
        }}
      >
        <SheetContent
          side="right"
          className="overflow-auto bg-white z-50 shadow-lg "
        >
          <SheetHeader>
            <SheetTitle className="text-2xl">
              {currentEditedId ? "Edit The Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
          />
          <div className="px-6 mb-5">
            <CommonForm
              onSubmit={onSubmit}
              buttonText={currentEditedId ? "Edit" : "Add"}
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AdminProducts;
