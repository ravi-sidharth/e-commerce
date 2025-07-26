import BrandItem from "@/components/admin-view/Brand-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { brandSchema } from "@/config/validationSechma";
import { toast } from "sonner";
import { addBrand, fetchAllBrand, updateBrand } from "@/store/brand-slice";
import { PlusCircleIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@/components/common/Pagination";

const AdminBrand = () => {
  const dispatch = useDispatch();
  const [openCreateBrand, setOpenCreateBrand] = useState(false);
  const [errors, setErrors] = useState({});
  const [editValueId, setEditValueId] = useState(null);
  const [formData, setFormData] = useState({ name: "" });
  useEffect(() => {
    dispatch(fetchAllBrand());
  }, [dispatch]);

  const { isLoading, brandList } = useSelector((state) => state.adminBrand);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(brandList.length / 10);
  const start = (currentPage - 1) * 10;
  const end = start + 10;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ name: "" });
    setErrors({});
    setOpenCreateBrand(false);
    setEditValueId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkValidation = brandSchema.safeParse(formData);
    if (!checkValidation.success) {
      setErrors(checkValidation.error.formErrors.fieldErrors);
      return;
    }
    const action = editValueId
      ? updateBrand({ formData, id: editValueId })
      : addBrand(formData);
    dispatch(action).then((data) => {
      if (data.payload.success) {
        toast.success(data.payload.message);
        dispatch(fetchAllBrand());
        resetForm();
      } else {
        toast.error(data.payload.message);
      }
    });
  };

  return (
    <Card>
      <CardContent className="py-3">
        <div className="w-full flex justify-between">
          <h1 className="text-2xl font-bold">Brands</h1>
          <Button size={"sm"} onClick={() => setOpenCreateBrand(true)}>
            <PlusCircleIcon /> Add New
          </Button>
        </div>
        {!isLoading ? (
          <Table className="text-[1rem]">
            <TableHeader>
              <TableRow>
                <TableHead>SR No.</TableHead>
                <TableHead>Brand Name</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brandList.length > 0 ? (
                brandList.slice(start,end).map((item, index) => {
                  return (
                    <BrandItem
                      srNo={index}
                      key={item.name}
                      brand={item}
                      setFormData={setFormData}
                      setOpenCreateBrand={setOpenCreateBrand}
                      setEditValueId={setEditValueId}
                    />
                  );
                })
              ) : (
                <TableRow className="font-semibold">
                  <TableCell>No Brand</TableCell>
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

        <Sheet
          open={openCreateBrand}
          onOpenChange={() => {
            resetForm();
          }}
        >
          <SheetContent
            side="right"
            className="overflow-auto bg-white"
            aria-describedby={undefined}
          >
            <SheetHeader>
              <SheetTitle className="text-3xl">
                {editValueId ? "Edit Brand" : "Add New Brand"}
              </SheetTitle>
            </SheetHeader>
            <form onSubmit={handleSubmit}>
              <div className="px-5">
                <div className="space-y-2">
                  <Label htmlFor={"name"}>Brand Name</Label>
                  <Input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter the brand name"
                    value={formData.name}
                    className="border-2 border-black mb-4"
                  />
                  {errors?.name && (
                    <p className="text-red-600">{errors.name[0]}</p>
                  )}
                </div>
                <div>
                  <Button className="w-full">
                    {isLoading ? "Saving" : "Save"}
                  </Button>
                </div>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </CardContent>
      {brandList && brandList.length > 0 ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      ) : (
        null
      )}
    </Card>
  );
};

export default AdminBrand;
