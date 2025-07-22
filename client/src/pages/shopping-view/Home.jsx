import { ChevronLeftIcon, ChevronRightIcon, Slice } from "lucide-react";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShoppingProduct } from "@/store/shopping-product-slice";
import ShoppingProductItem from "@/components/shopping-view/Product-item";
import { fetchAllCategory } from "@/store/category-slice";
import CategoryCard from "@/components/shopping-view/category-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getFeatureImage } from "@/store/slider-feature-slice";
function ShoppingHome() {
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  let sildes = [bannerOne, bannerTwo, bannerThree];
  const { isLoading, shoppingProductList } = useSelector(
    (state) => state.shoppingProduct
  );
  const { categoryList } = useSelector((state) => state.adminCategory);
  const { featureImageList } = useSelector((state) => state.slideImageFeature);
  
  useEffect(() => {
    dispatch(getFeatureImage());
  }, [dispatch]);
  
  useEffect(() => {
    if (!featureImageList || featureImageList.length === 0) return;
    const timer = setInterval(() => {
      console.log("hellow");
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [featureImageList]);
  
  useEffect(() => {
    dispatch(getShoppingProduct({ filterParams: {}, sortParams: null }));
    dispatch(fetchAllCategory());
  }, [dispatch]);
  
  console.log(featureImageList,"feature image list")

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative h-[280px] lg:h-[650px]">
        {featureImageList.map((slide, index) => {
          return (
            <img
              src={slide.image}
              key={index}
              className={`${
                index === currentSlide ? "opacity-100" : "opacity-0"
              } absolute left-0 top-0 w-full h-full object-cover transition duration-200`}
            />
          );
        })}
        <Button
          onClick={() =>
            setCurrentSlide(
              (preSlide) => (preSlide - 1 + sildes.length) % sildes.length
            )
          }
          variant="outline"
          size="icon"
          className=" absolute top-1/2 left-4 transform  translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          onClick={() =>
            setCurrentSlide((preSlide) => (preSlide + 1) % sildes.length)
          }
          variant="outline"
          size="icon"
          className=" absolute top-1/2 right-4 transform  translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>

      <section className="py-6 px-2 md:px-20">
        <div>
          <h2 className="text-xl lg:text-3xl font-bold text-center mb-6">
            Shop By Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-3 md:gap-8">
            {categoryList && categoryList.length > 0
              ? categoryList.map((item) => {
                  return <CategoryCard category={item} key={item._id} />;
                })
              : null}
          </div>
        </div>
      </section>

      {/* feature section  */}
      <section className="py-6 px-2 md:px-20">
        <div>
          <h2 className="text-xl md:text-3xl font-bold text-center mb-6">
            Feature Products
          </h2>
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
            ) : shoppingProductList && shoppingProductList.length > 0 ? (
              shoppingProductList.slice(0, 10)?.map((item) => {
                return <ShoppingProductItem key={item._id} product={item} />;
              })
            ) : (
              <p className="text-gray-600 text-xl font-semibold my-3">
                No Product Found
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShoppingHome;
