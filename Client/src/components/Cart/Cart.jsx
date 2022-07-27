import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../CartItem/CartItem";
import { Link } from "react-router-dom";
import { resetCart } from "../../redux/actions";
import Checkout from "../Mercadopago/Checkout";

export const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      items += cart.qty;
      price += item.qty * item.price;
    });

    setTotalItems(items);
    setTotalPrice(price);
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);

  const handleResetCart = () => {
    dispatch(resetCart());
  };

  const precio = totalPrice.toLocaleString("es-ar", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });

  localStorage.setItem("cartItems", JSON.stringify(cart));

  return (
    <>
      <div className="container mx-auto mt-10 bg-gray-200">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-4xl">Shopping Cart</h1>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-3xl w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-3xl w-1/5">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-3xl w-1/5">
                Price
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-3xl w-1/5">
                Total
              </h3>
            </div>
            <div className="mb-20">
              {/* Products */}
              {cart.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
            </div>
            <div className="flex justify-around">
              <Link
                className="bg-primary-color font-semibold py-3 px-2 rounded-md text-2xl text-white w-56"
                to="/"
              >
                Seguir Comprando
              </Link>
              <button
                onClick={handleResetCart}
                className="bg-red-500 font-semibold hover:bg-red-600 py-3 px-2 rounded-md text-2xl text-white w-56 "
              >
                Reset Cart
              </button>
            </div>
          </div>
          <div className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-4xl text-center border-b pb-8">
              Order Total
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-2xl">Total Items</span>
              <span className="font-semibold text-2xl">{precio}</span>
            </div>
            <div className="py-10">
              <label
                htmlFor="promo"
                className="font-semibold inline-block mb-3 text-lg"
              >
                Promo Code
              </label>
              <input
                type="text"
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-lg w-full"
              />
            </div>
            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-xl text-white">
              Apply
            </button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-3xl ">
                <span>Total cost</span>
                <span>{precio}</span>
              </div>

              <Checkout />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
