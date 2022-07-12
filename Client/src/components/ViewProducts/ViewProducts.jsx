import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/actions";
import { CardProduct } from "../CardProduct/CardProduct";

export const ViewProducts = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  console.log(products);

  useEffect(() => {
    dispatch(getProduct(products));
  }, [dispatch]);

  console.log(products);
  return (
    <>
      <div className="rounded-lg">
        {/* {products.length
          ? products.map((product) => (
              <CardProduct key={product.id} product={product} />
            ))
          : ""} */}
      </div>
    </>
  );
};
