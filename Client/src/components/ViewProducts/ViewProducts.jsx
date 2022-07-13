import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/actions";
import { CardProduct } from "../CardProduct/CardProduct";

export const ViewProducts = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <>
      <div className="rounded-lg">
        {products.data?.length
          ? products.data.map((product) => (
              <CardProduct key={product.id} product={product} />
            ))
          : ""}
      </div>
    </>
  );
};
