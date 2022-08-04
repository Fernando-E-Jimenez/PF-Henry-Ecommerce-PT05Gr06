import { Routes, Route, Navigate } from "react-router-dom";
import AddCategory from "./components/AddCategory/AddCategory";
import AddProduct from "./components/AddProduct/AddProduct";
import Admin from "./components/Admin/Admin";
import { CardDetail } from "./components/CardDetail/CardDetail";
import { Cart } from "./components/Cart/Cart";
import { Favorite } from "./components/Favorite/Favorite";
import { EditCategory } from "./components/EditCategory/EditCategory";
import { EditProduct } from "./components/EditProduct/EditProduct";
import { Home } from "./components/Home/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { ViewCategories } from "./components/ViewCategories/ViewCategories";
import { ViewProducts } from "./components/ViewProducts/ViewProducts";
import { ViewOrders } from "./components/ViewOrders/ViewOrders";
import { ViewRoles } from "./components/ViewRoles/ViewRoles"
import { PaymentForm } from "./components/PaymentForm/PaymentForm";
import { UserPurchases } from './components/UserPurchases/UserPurchases'
import { Checkout } from "./components/Mercadopago/Checkout";
import { Chat } from './components/ChatBot/Chat';


export const App = () => {
  return (
    <>
      <Navbar />
      <Chat />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<CardDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/favorite" element={<Favorite />} />
        {/* <Route path="/payment" element={<PaymentForm />} /> */}
        <Route path="/payment" element={<PaymentForm />} >
          <Route path="mercadopago/:idorder" element={<Checkout />} />
        </Route>
        <Route path="/purchases" element={<UserPurchases />} />
        <Route path="/mercadopago/:idorder" element={<Checkout />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="new-product" element={<AddProduct />} />
          <Route path="view-products" element={<ViewProducts />} />
          <Route path="edit-product" element={<EditProduct />} />
          <Route path="new-category" element={<AddCategory />} />
          <Route path="view-categories" element={<ViewCategories />} />
          <Route path="edit-category/:id" element={<EditCategory />} />
          <Route path="view-orders" element={<ViewOrders />} />
          <Route path="view-roles" element={<ViewRoles />} />
        </Route>
      </Routes>

    </>
  );
};
