import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function ShoppingProductTile({ product,handleGetProductDetails }) {
  return (
    <Card className="w-full max-w-sm mx-auto border-none bg-white">
      <div onClick={()=> handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img src={product?.image} alt={product?.title} className="w-full h-[300px] object-contain rounded-t-lg" />
          {
            product?.salePrice > 0 ? 
            <Badge className="absolute top-0 left-2 rounded-full bg-red-500 hover:bg-red-600 ">Sale</Badge> : null 
           }
  
        </div>
        <CardContent className="p-4">
           <h2 className="text-xl font-bold mb-2 line-clamp-2">{product?.title}</h2>
           <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-gray-500 ">{(product?.category).toUpperCase()}</span>
            <span className="text-[16px] text-gray-500">{(product?.brand).toUpperCase()}</span>
           </div>
           <div className="flex justify-between items-center mb-2">
            <span className={`text-lg font-semibold ${product?.salePrice >0 ? 'line-through':''}`}>{product?.price}</span>
            {
                product?.salePrice > 0 ? <span className="text-lg font-semibold">{product?.salePrice}</span> : null 
            }
            
           </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full bg-blue-400">Add to cart</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ShoppingProductTile;
