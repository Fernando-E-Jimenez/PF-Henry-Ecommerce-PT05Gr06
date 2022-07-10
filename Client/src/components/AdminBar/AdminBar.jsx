import React from "react";
import { Link } from "react-router-dom";

export const AdminBar = () => {
  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10 bg-white">
      <Link
        to="new-product"
        className="bg-primary-color w-full text-white font-bold block p-3 mt-5 text-center rounded-lg text-2xl"
      >
        New Product
      </Link>
      <Link
        to="view-products"
        className="bg-primary-color w-full text-white font-bold block p-3 mt-5 text-center rounded-lg text-2xl"
      >
        View Products
      </Link>
    </aside>
  );
};
