import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImages, getFeatureImage, } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch()
  const {featureImageList} = useSelector(state => state.commonFeature)

  const handleUploadImageFeature = async() => {
    dispatch(addFeatureImages(uploadedImageUrl)).then(data=> {
      if (data?.payload?.success) {
        setImageFile(null)
        setUploadedImageUrl('')
        dispatch(getFeatureImage())
      }
    })
  }

  useEffect(()=> {
    dispatch(getFeatureImage())
  },[dispatch])

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyle = {true}
      />
      <Button disabled ={uploadedImageUrl === ""} onClick={handleUploadImageFeature} className="mt-5 w-full bg-gray-950 text-white font-bold">Upload</Button>
      <div className="flex flex-col gap-4 mt-5"> 
        {
          featureImageList && featureImageList.length > 0 ? 
          featureImageList.map(featureImageItem => <div className="relative">
            <img src={featureImageItem.image} alt="" className="w-full h-[300px] object-cover rounded-md " />
          </div>) : null
        }
      </div>
    </div>
  );
}

export default AdminDashboard;
