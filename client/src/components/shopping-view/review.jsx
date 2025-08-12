import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ReviewStar from "@/components/shopping-view/ReviewStar";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner"
import { createReview, fetchProductReview } from "@/store/review-slice";
import ShowReviewItem from "./show-Reviews-item";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import { Star } from "lucide-react";
const Review = ({ productDetails }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [openReviewDailog, setOpenReviewDailog] = useState(false);
  const [starCount, setStarCount] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [limitValue, setLimitValue] = useState(2);
  const { isLoading, reviewDetails } = useSelector((state) => state.shopReview);

  useEffect(() => {
    dispatch(
      fetchProductReview({ productId: productDetails?._id, limitValue })
    );
  }, [dispatch, limitValue]);

  function handleReview() {
    if (starCount === 0) {
      toast.error("Please select the star.");
      return;
    }
    if (reviewComment === "") {
      toast.error("Please write the review.");
      return;
    }

    const reviewData = {
      user: user.id,
      product: productDetails?._id,
      rating: starCount,
      comment: reviewComment,
    };
    dispatch(createReview(reviewData)).then((data) => {
      if (data.payload.success) {
        toast.success(data.payload.message);
        setStarCount(0);
        setReviewComment("");
        setOpenReviewDailog(false);
        dispatch(
          fetchProductReview({ productId: productDetails?._id, limitValue })
        );
      } else {
        toast.error(data.payload)
        setOpenReviewDailog(false);
      }
    });
  }

  return (
    <div>
      <Dialog
      className="bg-white"
        open={openReviewDailog}
        onOpenChange={(value) => {
          setOpenReviewDailog(value);
          setStarCount(0);
        }}
      >
        <DialogTrigger className="w-full" asChild>
          <Button variant="outline" className="">Write a review</Button>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined} className="bg-white" >
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarFallback className="bg-black text-white font-bold">
                {user?.userName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{user?.userName}</div>
              <div className="text-xs">Posting publicly across EliteMart</div>
            </div>
          </div>
          <div className="text-xl">{productDetails?.title}</div>
          <div className="flex justify-center">
            {Array(5)
              .fill(null)
              .map((_, index) => {
                return (
                  <ReviewStar
                    key={index}
                    starCount={starCount}
                    value={index + 1}
                    setStarCount={setStarCount}
                  />
                );
              })}
          </div>
          <div className="space-y-4">
            <Textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Share details of own exprience"
            ></Textarea>
            <Button onClick={handleReview} className="w-full">
              Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className="">
          <Badge>
            {reviewDetails?.avgRating} <Star className="" size={"15"} /> |{" "}
            {reviewDetails?.totalReviews} Rating
          </Badge>
        </div>

      <div className=" mt-5 h-70 overflow-auto">
        <div className="text-xl font-extrabold">Reviews</div>
        {reviewDetails &&
        reviewDetails.reviewList &&
        reviewDetails?.reviewList?.length > 0 ? (
          reviewDetails.reviewList.map((item) => {
            return <ShowReviewItem reviewDetails={item} key={item._id} />;
          })
        ) : (
          <div>No Review</div>
        )}
        {isLoading ? (
          <div className="space-y-1">
            <div className="flex w-full">
              <Skeleton className="h-14 w-14 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-28 w-full" />
          </div>
        ) : null}
        {reviewDetails &&
        reviewDetails.reviewList &&
        reviewDetails.reviewList.length > 0 ? (
          <div className="text-center">
            <Button
              disabled={isLoading}
              onClick={() => limitValue=== 2 ?  setLimitValue(limitValue + 4) : setLimitValue(2)}
              variant={"outline"}
            >
             {limitValue === 2 ? "Show More User Review": "Show Less User Review" }
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Review;
