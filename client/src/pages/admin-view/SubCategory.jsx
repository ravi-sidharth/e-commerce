import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subCategorySchema } from "@/config/validationSechma";
import { toast } from "sonner"
import { fetchAllCategory } from "@/store/category-slice";
import {
  addSubCategory,
  fetchAllSubCategory,
  updateSubCategory,
} from "@/store/subcategory-slice";
import SubCategoryItem from "@/components/admin-view/SubCategory-item";
import { PlusCircleIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const AdminSubCategory = () => {
  const dispatch = useDispatch();
  const [openCreateSubCategory, setOpenCreateSubCategory] = useState(false);
  const [errors, setErrors] = useState({});
  const [editValueId, setEditValueId] = useState(null);
  const [formData, setFormData] = useState({ category: "", name: "" });

  useEffect(() => {
    dispatch(fetchAllSubCategory());
    dispatch(fetchAllCategory());
  }, [dispatch]);

  const { isLoading, subCategoryList } = useSelector(
    (state) => state.adminSubCategory
  );
  const { categoryList } = useSelector((state) => state.adminCategory);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = subCategorySchema.safeParse(formData);
    if (!validation.success) {
      setErrors(validation.error.formErrors.fieldErrors);
      return;
    }

    const action = editValueId
      ? updateSubCategory({ formData, id: editValueId })
      : addSubCategory(formData);

    dispatch(action).then(({ payload }) => {
     
      if (payload.success) {
        toast.success(payload?.data?.success)
        resetForm();
        dispatch(fetchAllSubCategory());
      } else {
        toast.error(payload?.data?.success)
      }
    });
  };

  const resetForm = () => {
    setOpenCreateSubCategory(false);
    setErrors({});
    setFormData({ category: "", name: "" });
    setEditValueId(null);
  };

  return (
    <Card>
      <CardContent className={"my-3"}>
        <div className="w-full flex justify-between">
          <h1 className="text-2xl font-bold">SubCategories</h1>
          <Button size={"sm"} onClick={() => setOpenCreateSubCategory(true)}>
            <PlusCircleIcon />
            Add New
          </Button>
        </div>
        {!isLoading ? (
          <Table className="text-[1rem]">
            <TableHeader>
              <TableRow>
                <TableHead>SR No.</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Sub Category</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subCategoryList.length > 0 ? (
                subCategoryList.map((item, index) => (
                  <SubCategoryItem
                    key={item._id}
                    srNo={index}
                    subCategory={item}
                    setFormData={setFormData}
                    setOpenCreateSubCategory={setOpenCreateSubCategory}
                    setEditValueId={setEditValueId}
                  />
                ))
              ) : (
                <TableRow className="font-semibold">
                  <TableCell>No Sub Category</TableCell>
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

        <Sheet open={openCreateSubCategory} onOpenChange={resetForm}>
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>
                {editValueId ? "Edit SubCategory" : "Add New SubCategory"}
              </SheetTitle>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="space-y-3 mt-5">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  id="category"
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                  value={formData.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryList.map((item) => (
                      <SelectItem key={item._id} value={item._id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-red-600">{errors.category[0]}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Sub Category</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter the name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                {errors.name && (
                  <p className="text-red-600">{errors.name[0]}</p>
                )}
              </div>
              <Button className="w-full">
                {editValueId ? "Update" : "Save"}
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default AdminSubCategory;
