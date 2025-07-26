import ProductImageUpload from "@/components/admin-view/image-upload";
import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import {
  addFeatureImages,
  deleteFeatureImage,
  getFeatureImage,
} from "@/store/slider-feature-slice/index";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.slideImageFeature);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(featureImageList.length / 2);
  const start = (currentPage - 1) * 2;
  const end = start + 2;

  const handleUploadImageFeature = async () => {
    dispatch(addFeatureImages(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        setImageFile(null);
        setUploadedImageUrl("");
        dispatch(getFeatureImage());
      }
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteFeatureImage(id)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        dispatch(getFeatureImage());
      } else {
        toast.error(data?.payload?.message);
      }
    });
  };

  useEffect(() => {
    dispatch(getFeatureImage());
  }, [dispatch]);

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyle={true}
      />
      <Button
        disabled={uploadedImageUrl === ""}
        onClick={handleUploadImageFeature}
        className="mt-5 w-full bg-gray-950 text-white font-bold"
      >
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.slice(start,end).map((featureImageItem) => (
              <div key={featureImageItem._id} className="relative group">
                <img
                  src={featureImageItem.image}
                  alt=""
                  className="w-full h-[300px] object-cover rounded-md"
                />
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={() => handleDelete(featureImageItem._id)}
                >
                  Delete
                </button>
              </div>
            ))
          : null}
        {featureImageList && featureImageList.length > 0 ? (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        ) : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
