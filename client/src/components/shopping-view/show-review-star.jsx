import React from "react";

const ShowReviewStar = ({ rating, value }) => {

  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill={value<=rating?"#FFD700" : "#D3D3D8"} // Yellow on hover or selected
      xmlns="http://www.w3.org/2000/svg"
      className="transition-all duration-300 ease-in-out cursor-pointer"
      aria-label={`Rate ${value} star`}
    >
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        stroke="grey"
        strokeWidth="1"
      />
    </svg>
  );
};

export default ShowReviewStar;
