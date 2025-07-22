import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner"
import { useDispatch } from "react-redux";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  deleteSubCategory,
  fetchAllSubCategory,
} from "@/store/subcategory-slice";
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
function DeleteButton({ getSubCategoryId }) {
  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    dispatch(deleteSubCategory(id)).then((data) => {
      if (data?.payload?.success) {
        toast.error(data.payload.message);
        dispatch(fetchAllSubCategory());
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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete and
            remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteHandler(getSubCategoryId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const SubCategoryItem = ({
  srNo,
  subCategory,
  setOpenCreateSubCategory,
  setFormData,
  setEditValueId,
}) => {
  return (
    <TableRow>
      <TableCell>{srNo + 1}</TableCell>
      <TableCell>{subCategory?.category?.name}</TableCell>
      <TableCell>{subCategory.name}</TableCell>
      <TableCell className="flex gap-4">
        <Button
          onClick={() => {
            setOpenCreateSubCategory(true);
            setFormData({
              category: subCategory.category._id,
              name: subCategory.name,
            });
            setEditValueId(subCategory._id);
          }}
          size={"sm"}
          variant={"outline"}
        >
          <EditIcon />
        </Button>
        <DeleteButton getSubCategoryId={subCategory._id} />
      </TableCell>
    </TableRow>
  );
};

export default SubCategoryItem;
