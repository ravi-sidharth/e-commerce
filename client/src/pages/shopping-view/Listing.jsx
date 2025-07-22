import ShoppingProductItem from "../../components/shopping-view/Product-item";
import { Button } from "../../components/ui/button";
import { DropdownMenuRadioItem } from "../../components/ui/dropdown-menu";
import { sortOptions } from "../../config";
import { getShoppingProduct } from "../../store/shopping-product-slice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ArrowDownUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "../../components/ui/skeleton";
import ProductFilter from "../../components/shopping-view/Productfilter";
import Pagination from "./Pagination";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState(null);

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const limit = 2; 

  const { isLoading, shoppingProductList, total } = useSelector(
    (state) => state.shoppingProduct
  );

  useEffect(() => {
    setSort("low-to-high");
    setFilter(JSON.parse(sessionStorage.getItem("filter")) || {});
  }, [sessionStorage.getItem("filter")]);

  useEffect(() => {
    if (filter && sort) {
      dispatch(getShoppingProduct({ filterParams: filter, sortParams: sort, page, limit }));
    }
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const createQueryString = createSearchParamsHelper(filter);
      setSearchParams(new URLSearchParams(`${createQueryString}&page=${page}`));
    }
  }, [filter, page]);

  function handleFilter(getSectionId, getCurrentOptions) {
    let copyFilter = { ...filter };
    const indexOfCurrentSection = Object.keys(copyFilter).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      copyFilter = { ...copyFilter, [getSectionId]: [getCurrentOptions] };
    } else {
      const indexOfCurrentOption =
        copyFilter[getSectionId].indexOf(getCurrentOptions);
      if (indexOfCurrentOption === -1) {
        copyFilter[getSectionId].push(getCurrentOptions);
      } else {
        copyFilter[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }
    setFilter(copyFilter);
    sessionStorage.setItem("filter", JSON.stringify(copyFilter));
  }

  return (
    <div className="py-6 flex flex-col sm:flex-row h-screen gap-3">
      <ProductFilter handleFilter={handleFilter} filter={filter} />

      <div className="flex-1 h-full overflow-y-auto">
        <div className="sticky top-0 z-50 bg-white flex flex-col md:flex-row justify-between items-center px-10 pb-1">
          <div className="font-extrabold text-lg ">All Product</div>
          <div className="flex items-center gap-4">
            <span className="font-medium">
              {shoppingProductList?.length} Products
            </span>
            <DropdownMenu className="bg-white">
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowDownUp className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[200px] bg-white z-40 rounded"
              >
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => {
                    setSort(value);
                  }}
                  className="bg-white not-first:"
                >
                  {sortOptions.map((item) => {
                    return (
                      <DropdownMenuRadioItem className="bg-white" key={item.id} value={item.id}>
                        {item.label}
                      </DropdownMenuRadioItem>
                    );
                  })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="w-full py-3 px-1 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
            {isLoading ? (
              Array(10)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="flex flex-col space-y-3">
                    <Skeleton className="h-[300px] w-full rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))
            ) : shoppingProductList && shoppingProductList.length > 0 ? (
              shoppingProductList?.map((item) => {
                return <ShoppingProductItem key={item._id} product={item} />;
              })
            ) : (
              <p className="text-gray-600 text-xl font-semibold my-3">
                No Product Found
              </p>
            )}
          </div>
          <Pagination
            page={page}
            total={total || 0}
            limit={limit}
            onPageChange={setPage}
          />
        </div>
      </div>      
    </div>
  );
}

export default ShoppingListing;
