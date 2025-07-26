import CategoryItems from "@/components/admin-view/Category-item";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { categorySchema } from "@/config/validationSechma";
import { toast } from "sonner";
import {
  addNewCategory,
  fetchAllCategory,
  updateCategory,
} from "@/store/category-slice";
import { Label } from "@radix-ui/react-label";
import { PlusCircleIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@/components/common/Pagination";

const AdminCategory = () => {
  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [editedIdAndOldLogo, setEditedIdAndOldLogo] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    logo: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "logo" ? e.target.files[0] : e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({ name: "", logo: null });
    setErrors({});
    setEditedIdAndOldLogo({});
    setOpenCreateCategory(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const checkValidation = categorySchema.safeParse(formData);
    if (!checkValidation.success) {
      setErrors(checkValidation.error.formErrors.fieldErrors);
      return;
    }

    let newFormData = new FormData();
    newFormData.append("name", formData.name);
    newFormData.append("logo", formData.logo);

    const action = editedIdAndOldLogo.id
      ? updateCategory({ newFormData, id: editedIdAndOldLogo.id })
      : addNewCategory(newFormData);

    dispatch(action).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        resetForm();
        dispatch(fetchAllCategory());
      } else {
        toast.error(data?.payload?.message);
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  const { isLoading, categoryList } = useSelector(
    (state) => state.adminCategory
  );

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(categoryList.length / 10);
  const start = (currentPage - 1) * 10;
  const end = start + 10;

  return (
    <Card>
      <CardContent className="py-4">
        <div className="w-full flex justify-between">
          <h1 className="text-2xl font-bold">Categories</h1>
          <Button size={"sm"} onClick={() => setOpenCreateCategory(true)}>
            <PlusCircleIcon />
            Add New
          </Button>
        </div>
        <div className="w-full">
          {!isLoading ? (
            <Table className="text-[1rem]">
              <TableHeader>
                <TableRow>
                  <TableHead>SR No.</TableHead>
                  <TableHead>Category Name</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryList.length > 0 ? (
                  categoryList.slice(start,end).map((item, index) => (
                    <CategoryItems
                      key={item.name}
                      srNo={index}
                      category={item}
                      setFormData={setFormData}
                      setEditedIdAndOldLogo={setEditedIdAndOldLogo}
                      setOpenCreateCategory={setOpenCreateCategory}
                    />
                  ))
                ) : (
                  <TableRow className="font-semibold">
                    <TableCell>No Category</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            Array(10)
              .fill(null)
              .map((_, index) => {
                return (
                  <div key={index} className="space-y-1 mb-3">
                    <Skeleton className="h-12 w-full]" />
                  </div>
                );
              })
          )}
        </div>
        <Sheet open={openCreateCategory} onOpenChange={resetForm}>
          <SheetContent
            side="right"
            className="overflow-auto bg-white px-2"
            aria-describedby={undefined}
          >
            <SheetHeader>
              <SheetTitle className="text-2xl ">
                {editedIdAndOldLogo.id ? "Edit Category" : "Add New Category"}
              </SheetTitle>
            </SheetHeader>
            <form onSubmit={onSubmit}>
              <div className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-md">
                    Name
                  </Label>
                  <Input
                    onChange={handleChange}
                    value={formData.name}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter the name"
                    className="border"
                  />
                  {errors.name && (
                    <p className="text-red-700">{errors.name[0]}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="logo" className="text-md">
                    Logo
                  </Label>
                  <Input
                    onChange={handleChange}
                    id="logo"
                    name="logo"
                    type="file"
                    className="border"
                  />
                  {errors.logo && (
                    <p className="text-red-700">{errors.logo[0]}</p>
                  )}
                </div>
                {editedIdAndOldLogo.id && (
                  <div className="relative">
                    <h1>Old Image</h1>
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URI}/${
                        editedIdAndOldLogo.oldLogo
                      }`}
                      className="w-1/2 h-[150px] object-cover rounded-t-lg"
                    />
                  </div>
                )}
                <Button className="w-full">Save</Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </CardContent>

      {categoryList.length > 0 ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      ) : null}
    </Card>
  );
};

export default AdminCategory;
