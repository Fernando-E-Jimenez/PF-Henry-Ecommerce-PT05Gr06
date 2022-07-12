import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions";
import { CardProduct } from "../CardProduct/CardProduct";

export const ViewProducts = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  console.log(products);
  return (
    <>
      <div className="rounded-lg">
        {products.length
          ? products.map((product) => (
              <CardProduct key={product.id} product={product} />
            ))
          : ""}
      </div>
    </>
  );
};
