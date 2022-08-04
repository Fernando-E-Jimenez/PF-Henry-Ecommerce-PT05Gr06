import { Profiler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../CartItem/CartItem";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { resetCart, resetCartUser } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

import "./Cart.css";

import { Checkout } from "../Mercadopago/Checkout.jsx";

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const { isAuthenticated } = useAuth0();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    let items = 0;
    let price = 0;
    if (cart.length > 0) {
      cart.forEach((item) => {
        items += item.car.cant;
        price += item.car.cant * item.price;
      });
    }
    setTotalItems(items);
    setTotalPrice(price);
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);

  const handleResetCart = () => {
    Swal.fire({
      icon: "warning",
      title: "¿Estas seguro?",
      text: `Estas seguro que desea elminar el carrito completo?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        isAuthenticated
          ? dispatch(resetCartUser(profile.id))
          : dispatch(resetCart());
        Swal.fire(
          "Eliminado!",
          "El carrito se ha eliminado correctamente",
          "success"
        );
      }
    });
  };

  const precio = totalPrice.toLocaleString("es-ar", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });

  localStorage.setItem("cartItems", JSON.stringify(cart));

  return (
    <>
      <div className="container mx-auto w-full h-full cartContainer text-gray-500">
        <div className="flex shadow-md my-2 w-full h-full cartFlex">
          <div className="md:w-3/4 bg-white px-10 py-10 cartItems">
            <div className="flex justify-center border-b pb-8">
              <h1 className="font-semibold text-4xl">Carrito</h1>
            </div>
            <div className="sm:flex mt-10 mb-5 titles hidden">
              <h3 className="font-semibold text-gray-600 text-3xl w-2/5">
                Detalle de productos
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-3xl w-1/5">
                Cantidad
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-3xl w-1/5">
                Precio Un.
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-3xl w-1/5">
                Total
              </h3>
            </div>
            <div className="mb-10">
              {/* Products */}
              {cart.length > 0 ? (
                cart.map((product) => (
                  <CartItem key={product.id} product={product} />
                ))
              ) : (
                <p className="text-center text-2xl">Tu carrito está vacío</p>
              )}
            </div>
            <div className="flex justify-around cartButtons">
              <Link
                className="bg-primary-color hover:bg-secondary-color font-semibold py-3 px-2 rounded-md text-2xl text-white w-3/4 text-center mb-4 sm:mb-0 sm:w-56"
                to="/"
              >
                Volver a inicio
              </Link>
              {cart.length > 0 ? (
                <button
                  onClick={handleResetCart}
                  className="bg-red-400 font-semibold hover:bg-red-600 py-3 px-2 rounded-md text-2xl text-white w-3/4 text-center mb-4 sm:mb-0 sm:w-56"
                >
                  Borrar todo
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="sm:w-1/4 px-8 py-10">
            <h1 className="font-semibold text-4xl text-center border-b">
              Total de la compra
            </h1>

            <div className="border-t">
              <div className="flex font-semibold justify-center py-6 text-3xl text-center">
                <span>{precio}</span>
              </div>
              <button
                onClick={() => navigate("/payment")}
                disabled={cart.length <= 0 ? true : false}
                className={`bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-2xl text-white w-full ${
                  cart.length <= 0 ? "disabled:opacity-25" : ""
                }`}
              >
                Confirmar compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
