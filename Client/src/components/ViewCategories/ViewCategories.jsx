import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../redux/actions";
import { CardCategory } from "../CardCategory/CardCategory";

export const ViewCategories = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <>
      <div className="rounded-lg">
        {categories.length
          ? categories.map((category) => (
              <CardCategory key={category.id} category={category} />
            ))
          : ""}
      </div>
    </>
  );
};
