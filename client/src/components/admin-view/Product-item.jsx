import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { deleteProduct, fetchAllProducts } from "@/store/product-slice";
import { toast } from "sonner"
import { EditIcon, TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
function DeleteButton({ getProductId }) {
  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    dispatch(deleteProduct(id)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload.message);
        dispatch(fetchAllProducts());
      } else {
        toast.error(data.payload.message);
      }
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={"text-red-500"} size={"sm"} variant={"outline"}>
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete and
            remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={() => deleteHandler(getProductId)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
const ProducItem = ({
  srNo,
  product,
  setFormData,
  setEditIdAndImages,
  setOpenCreateProduct,
}) => {
  return (
    <TableRow >
      <TableCell>{srNo + 1}</TableCell>
      <TableCell>
        {product["title"].split(" ").slice(0, 2).join(" ").concat("...")}
      </TableCell>
      <TableCell>
        {product["description"].split(" ").slice(0, 3).join(" ").concat("...")}
      </TableCell>
      <TableCell>{product?.price}</TableCell>
      <TableCell>{product?.salePrice}</TableCell>
      <TableCell>{product?.brand?.name}</TableCell>
      <TableCell>{product?.category?.name}</TableCell>
      <TableCell>{product?.subcategory?.name}</TableCell>
      <TableCell>{product?.size}</TableCell>
      <TableCell>{product?.stock}</TableCell>
      <TableCell>
        <div className="flex gap-4">
          {product?.images.map((image, index) => {
            return (
              <div className="relative w-[50px] h-[50px] " key={index}>
                <img
                  src={image}
                  alt={`ProductImage${index + 1}`}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
            );
          })}
        </div>
      </TableCell>
      <TableCell className="flex gap-2">
     
        <Button
          onClick={() => {
            setOpenCreateProduct(true);
            setFormData({
              title: product.title,
              description: product.description,
              price: product.price,
              salePrice: product.salePrice,
              brand: product.brand._id,
              category: product.category._id,
              subcategory: product.subcategory._id,
              size: product.size,
              stock: product.stock,
              images: [],
            });
            setEditIdAndImages({ id: product._id, images: product.images });
          }}
          variant={"outline"}
          size={"sm"}
        >
          <EditIcon />
        </Button>
        <DeleteButton getProductId={product._id} />
      </TableCell>
    </TableRow>
  );
};

export default ProducItem;
