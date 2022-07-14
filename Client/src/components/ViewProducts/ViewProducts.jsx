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
      <div className="border bg-gray-300 my-1 rounded-lg text-xl p-5 flex align-middle justify-between">
        <p className="flex w-3/5 align-center text-2xl">Name</p>
        <p className="flex w-1/5 align-middle text-2xl">Price</p>
        <p className="flex w-1/5 align-middle text-2xl">Stock</p>
        <p className="flex w-1/5 align-middle text-2xl">Acciones</p>
      </div>
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
