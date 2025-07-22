import React, { useState } from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Separator } from "@/components/ui/separator"
import ShowReviewStar from './show-review-star'

const ShowReviewItem = ({ reviewDetails }) => {
  const [sliceValue, setSilceValue] = useState(30);
  const comment = reviewDetails?.comment.split(' ').slice(0, sliceValue).join(" ");
  return <>
    <div className='space-y-1' >
      <div className='flex gap-2 items-center'>
        <Avatar>
          <AvatarFallback className='bg-black text-white font-bold'>{reviewDetails?.user?.userName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className='font-semibold'>{reviewDetails?.user?.userName}</div>
          <div className='text-xs'>{reviewDetails?.createdAt.split('T')[0]}</div>
        </div>
      </div>
      <div className='flex'>
        {Array(5).fill(null).map((_, index) => {
          return <ShowReviewStar rating={reviewDetails?.rating} key={index} value={index + 1} />
        })}
      </div>
      <div className='text-base'>
        {comment} {reviewDetails?.comment.split(' ').length > sliceValue && reviewDetails?.comment.split(' ').length > sliceValue ? <button onClick={() => setSilceValue(reviewDetails?.comment.length)} className='text-blue-900 font-semibold'>...more</button> : null}
      </div>
    </div>
    <Separator />
  </>
}

export default ShowReviewItem
