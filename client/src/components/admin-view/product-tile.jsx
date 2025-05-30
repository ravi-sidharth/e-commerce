import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete
}) {
  return (
    <Card key={product._id} className="w-full max-w-sm mx-auto border-none">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-contain rounded-t-lg"
          />
        </div>
        <CardContent className="">
          <h2 className={`text-xl font-bold mb-2 mt-2 line-clamp-2`}>{product?.title}</h2>
          <div className={"flex justify-between items-center mb-2"}>
            <span
              className={`${
                product.salePrice > 0 ? "line-through" : ""
              } text-xl font-semibold`}
            >
              ${product?.price}
            </span>
            <span className={`text-xl font-bold`}>
              {product?.salePrice > 0 ? "$"+product?.salePrice : ""}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button onClick= {() => {
            setOpenCreateProductsDialog(true)
            setCurrentEditedId(product?._id)    
            setFormData(product)
          }} className="bg-gray-950 text-white font-bold">Edit</Button>
          <Button onClick={() => {
            handleDelete(product?._id)
          }} className="bg-gray-950 text-white font-bold">Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
