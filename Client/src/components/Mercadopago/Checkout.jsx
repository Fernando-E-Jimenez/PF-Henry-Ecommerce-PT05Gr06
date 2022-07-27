import React from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  return (
    <>
      <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-2xl text-white w-full">
        Finalizar Compra
      </button>
    </>
  );
};

export default Checkout;
