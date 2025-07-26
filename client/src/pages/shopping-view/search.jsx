import ShoppingProductItem from "@/components/shopping-view/Product-item";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { resetsearchResult, searchProduct } from "@/store/search-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const ShopSearch = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");

  const { isLoading, searchResult } = useSelector((state) => state.shopSearch);

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 2) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams({ search: keyword }));
      }, 1000);
      dispatch(searchProduct(keyword)).then((data) => {
      });
    } else {
      dispatch(resetsearchResult());
    }
  }, [keyword]);

  return (
    <div className="py-20 px-2 md:px-20">
      <div className="flex justify-center w-full px-3">
        <div className="w-full lg:w-1/2">
          <Input
          className="border "
            placeholder="Search"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>
      <div className="my-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-6">
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
          ) : searchResult && searchResult.length > 0 ? (
            searchResult.slice(0, 10)?.map((item) => {
              return <ShoppingProductItem key={item._id} product={item} />;
            })
          ) : (
            <p className="text-gray-600 font-semibold m-3">No Product Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopSearch;
