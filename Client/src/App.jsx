import { Routes, Route, Navigate } from "react-router-dom";
import AddCategory from "./components/AddCategory/AddCategory";
import AddProduct from "./components/AddProduct/AddProduct";
import Admin from "./components/Admin/Admin";
import { CardDetail } from "./components/CardDetail/CardDetail";
import { EditCategory } from "./components/EditCategory/EditCategory";
import { EditProduct } from "./components/EditProduct/EditProduct";
import { Home } from "./components/Home/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { ViewCategories } from "./components/ViewCategories/ViewCategories";
import { ViewProducts } from "./components/ViewProducts/ViewProducts";

export const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<CardDetail />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="new-product" element={<AddProduct />} />
          <Route path="view-products" element={<ViewProducts />} />
          <Route path="edit-product" element={<EditProduct />} />
          <Route path="new-category" element={<AddCategory />} />
          <Route path="view-categories" element={<ViewCategories />} />
          <Route path="edit-category/:id" element={<EditCategory />} />
        </Route>
      </Routes>
    </>
  );
};
