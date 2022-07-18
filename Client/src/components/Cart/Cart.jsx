import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartItem } from "../CartItem/CartItem";

export const Cart = () => {
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
            <div>
              {/* Products */}
              {cart.map((product) => (
                <CartItem
                  key={product.id}
                  product={product}
                  setTotalPrice={setTotalPrice}
                />
              ))}
            </div>
          </div>
          <div className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-4xl text-center border-b pb-8">
              Order Total
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-2xl">Total Items</span>
              <span className="font-semibold text-2xl">{totalPrice}</span>
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
                <span>{totalPrice}</span>
              </div>
              <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-2xl text-white w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
