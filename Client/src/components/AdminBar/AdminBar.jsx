import { Link } from "react-router-dom";

export const AdminBar = () => {
  return (
    <aside className=" px-5 py-10 bg-white rounded-lg shadow ml-6">
      <Link
        to="view-orders"
        className="bg-primary-color w-full text-white font-bold block p-3 mt-5 text-center rounded-lg text-2xl"
      >
        View Orders
      </Link>
      <Link
        to="view-products"
        className="bg-primary-color w-full text-white font-bold block p-3 mt-5 text-center rounded-lg text-2xl"
      >
        View Products
      </Link>
      <Link
        to="new-product"
        className="bg-primary-color w-full text-white font-bold block p-3 mt-5 text-center rounded-lg text-2xl"
      >
        New Product
      </Link>
      <Link
        to="view-categories"
        className="bg-primary-color w-full text-white font-bold block p-3 mt-5 text-center rounded-lg text-2xl"
      >
        View Categories
      </Link>
      <Link
        to="new-category"
        className="bg-primary-color w-full text-white font-bold block p-3 mt-5 text-center rounded-lg text-2xl"
      >
        New Category
      </Link>
      <Link
        to="view-roles"
        className="bg-primary-color w-full text-white font-bold block p-3 mt-5 text-center rounded-lg text-2xl"
      >
        View Roles
      </Link>
    </aside>
  );
};
