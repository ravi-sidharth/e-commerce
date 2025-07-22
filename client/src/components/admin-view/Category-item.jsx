import React from "react";
import { Button } from "../ui/button";
import { deleteCategory, fetchAllCategory } from "@/store/category-slice";
import { toast } from "sonner"
import { useDispatch } from "react-redux";
import { TableCell, TableRow } from "@/components/ui/table";
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
function DeleteButton({ getCategoryId }) {
  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    dispatch(deleteCategory(id)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload.message);
        dispatch(fetchAllCategory());
      } else {
        toast.error(data.payload.message );
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
          <AlertDialogAction onClick={() => deleteHandler(getCategoryId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const CategoryItems = ({
  srNo,
  category,
  setOpenCreateCategory,
  setFormData,
  setEditedIdAndOldLogo,
}) => {
  return (
    <TableRow>
      <TableCell>{srNo + 1}</TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell>
        <div className="relative w-[40px] h-[40px] ">
          <img
            src={category.logo}
            alt={category?.name}
            className="h-full w-full  object-cover rounded-lg"
          />
        </div>
      </TableCell>
      <TableCell className="flex gap-4">
        <Button
          onClick={() => {
            setOpenCreateCategory(true);
            setFormData({ name: category.name });
            setEditedIdAndOldLogo({ id: category._id, oldLogo: category.logo });
          }}
          size={"sm"}
          variant={"outline"}
        >
          <EditIcon />
        </Button>
        <DeleteButton getCategoryId={category._id} />
      </TableCell>
    </TableRow>
  );
};

export default CategoryItems;
