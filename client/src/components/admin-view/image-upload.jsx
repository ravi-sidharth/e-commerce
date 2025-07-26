import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import axiosInstance from "@/utils/axiosInstance";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  imageLoadingState,
  isCustomStyle = false
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const uploadImageToCloudinary = async () => {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("file", imageFile);
    const response = await axiosInstance.post(
      `/api/admin/product/upload-image`,
      data
    );
    if (response?.data?.success) {
      setUploadedImageUrl(response?.data?.result?.url);
    }
    setImageLoadingState(false);
  };

  useEffect(() => {
    if (imageFile !== null ) uploadImageToCloudinary();      
  }, [imageFile]);


  return (
    <div className={`w-full px-6 ${isCustomStyle? '' :'max-w-md mx-auto'}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col justify-center items-center h-32 cursor-pointer "
          >
            <UploadCloudIcon className="w-10 h-10 mb-2 " />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100 transition-colors" />
        ) : (
          <div className="flex justify-between items-center ">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 mr-2" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;