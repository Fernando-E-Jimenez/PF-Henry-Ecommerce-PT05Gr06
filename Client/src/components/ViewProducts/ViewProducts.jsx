import { useEffect, useState } from "react";
import "./ViewProduct.css";
import { useDispatch, useSelector } from "react-redux";
import {
  viewProducts,
  getProductsFilter,
  changeOrder,
} from "../../redux/actions";
import { CardProduct } from "../CardProduct/CardProduct";

export const ViewProducts = () => {
  const dispatch = useDispatch();
  const [drink, setDrink] = useState("");

  const products = useSelector((state) => state.products);
  const order = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(viewProducts("", order.type, order.by));
  }, [dispatch, order]);

  return (
    <>
      <div className="searchViewProducts flex flex-col sm:flex-row ">
        <button
          className="w-11/12 m-auto sm:w-1/5 py-2 px-2 bg-gray-200 rounded-md shadow-md mb-2 sm:mr-2"
          onClick={() => dispatch(changeOrder("ASC", "name"))}
        >
          Ordenar de la A-Z
        </button>
        <button
          className="w-11/12 m-auto sm:w-1/5 py-2 px-2 bg-gray-200 rounded-md shadow-md mb-2 sm:mr-2"
          onClick={() => dispatch(changeOrder("DESC", "name"))}
        >
          Ordenar de la Z-A
        </button>
        <button
          className="w-11/12 m-auto sm:w-1/5 py-2 px-2 bg-gray-200 rounded-md shadow-md mb-2 sm:mr-2"
          onClick={() => dispatch(changeOrder("ASC", "price"))}
        >
          Ordenar del menor al mayor precio
        </button>
        <button
          className="w-11/12 m-auto sm:w-1/5 py-2 px-2 bg-gray-200 rounded-md shadow-md mb-2 sm:mr-2"
          onClick={() => dispatch(changeOrder("DESC", "price"))}
        >
          Ordenar del mayor al menor precio
        </button>
        <form
          className="searchContainer border shadow-md mb-2 w-11/12 m-auto"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(getProductsFilter(drink));
            setDrink("");
          }}
        >
          <input
            className="searchBar"
            placeholder="Search"
            value={drink}
            onChange={(e) => setDrink(e.target.value)}
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-search"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#9e9e9e"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </button>
        </form>
      </div>
      <div className="border bg-gray-300 my-1 rounded-lg text-xl p-5 flex align-middle justify-between">
        <div className="flex w-full sm:w-3/5">
          <p className="flex w-3/5 align-center text-2xl">Name</p>
          <p className="flex w-1/5 align-middle text-2xl">Price</p>
          <p className="flex w-1/5 align-middle text-2xl">Stock</p>
        </div>
        <p className="hidden sm:flex w-2/5 align-middle text-2xl justify-center">
          Acciones
        </p>
      </div>
      <div className="rounded-lg mt-4 sm:mt-0">
        {products.data?.length
          ? products.data.map((product) => (
              <CardProduct key={product.id} product={product} />
            ))
          : ""}
      </div>
    </>
  );
};
