import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      onClick={handleRatingChange? ()=> handleRatingChange(star) :null}
      className={`p-2 rounded-full transition-colors border-gray-200 ${
        star <= rating
          ? "text-yellow-500 hover:bg-black"
          : "text-black hover:bg-gray-950 hover:text-white hover:font-bold"
      }`}
      variant="outline"
      size="icon"
    >
      <StarIcon
        className={`w-6 h-6 ${
          star <= rating ? "fill-yellow-500" : "fill-black"
        }`}
      />
    </Button>
  ));
}

export default StarRatingComponent;
