import { fetchAllBrand } from "@/store/brand-slice";
import { fetchAllCategory } from "@/store/category-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";

function ProductFilter({ filter, handleFilter }) {
  const dispatch = useDispatch();
  const { isLoading, categoryList } = useSelector(
    (state) => state.adminCategory
  );
  const { isLoading: isLaoadigBrand, brandList } = useSelector(
    (state) => state.adminBrand
  );

  useEffect(() => {
    dispatch(fetchAllCategory());
    dispatch(fetchAllBrand());
  }, [dispatch]);

  return (
    <div className="rounded-lg shadow-sm flex  flex-col h-full w-fit lg:w-64 overflow-auto">
      <div className=" sticky top-0 z-10 bg-white px-4 py-1">
        <h2 className="text-lg font-extrabold">Product Filter</h2>
      </div>
      <div className="flex flex-col h-full ">
        <div className="space-y-2 p-4">
          <div className="font-bold">Category</div>
          <div className="space-y-4">
            {isLoading
              ? Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index} className="flex flex-col space-y-3">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full]" />
                      </div>
                    </div>
                  ))
              : categoryList && categoryList.length > 0
              ? categoryList.map((item) => {
                  return (
                    <Label
                      className="flex items-center gap-2 font-medium"
                      key={item._id}
                    >
                      <Checkbox
                        checked={
                          filter &&
                          filter["category"]?.indexOf(item._id) > -1 &&
                          Object.keys(filter).length > 0
                        }
                        onCheckedChange={() =>
                          handleFilter("category", item._id)
                        }
                      />
                      {item.name}
                    </Label>
                  );
                })
              : null}
          </div>
        </div>
        <div className="space-y-2 p-4">
          <div className="font-bold">Brand</div>
          <div className="space-y-4 grid">
            {isLaoadigBrand
              ? Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index} className="flex flex-col space-y-3">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full]" />
                      </div>
                    </div>
                  ))
              : brandList && brandList.length > 0
              ? brandList.map((item) => {
                  return (
                    <Label
                      className="flex items-center gap-2 font-medium"
                      key={item._id}
                    >
                      <Checkbox
                        checked={
                          filter &&
                          filter["brand"]?.indexOf(item._id) > -1 &&
                          Object.keys(filter).length > 0
                        }
                        onCheckedChange={() => handleFilter("brand", item._id)}
                      />
                      {item.name}
                    </Label>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFilter;
