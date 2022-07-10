import { Routes, Route, Navigate } from "react-router-dom";
import AddProduct from "./components/AddProduct/AddProduct";
import Admin from "./components/Admin/Admin";
import { CardDetail } from "./components/CardDetail/CardDetail";
import { Home } from "./components/Home/Home";
import { Navbar } from "./components/Navbar/Navbar";
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
        </Route>
      </Routes>
    </>
  );
};
