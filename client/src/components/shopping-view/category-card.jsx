import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCategoryId) {
    sessionStorage.removeItem("filter");
    const currentFilter = { category: [getCategoryId] };
    sessionStorage.setItem("filter", JSON.stringify(currentFilter));
    setSearchParams(new URLSearchParams({ category: [getCategoryId] }));
    navigate(`/shop/listing`);
  }

  return (
    <Card
      className="cursor-pointer hover:outline shadow-2xl"
      onClick={() => handleNavigate(category._id)}
    >
      <CardHeader>
        <div className="h-36 lg:h-48 w-full">
          <img
            src={category.logo}
            alt="category logo"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <CardTitle className="text-center font-medium text-base">
          {category.name}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default CategoryCard;
