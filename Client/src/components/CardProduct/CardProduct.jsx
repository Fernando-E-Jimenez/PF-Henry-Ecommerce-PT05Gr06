import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { obtainEditProduct } from "../../redux/actions";

export const CardProduct = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirectEdit = (product) => {
    dispatch(obtainEditProduct(product));
    navigate(`/admin/edit-product`);
  };

  return (
    <>
      <div className="border my-1 rounded-lg text-xl p-5 flex align-middle justify-between">
        <p className="flex w-4/5 align-center mr-3 text-2xl">{product.name}</p>
        <p className="flex w-1/5 align-middle text-2xl">{product.price}</p>
        <p className="flex w-1/5 align-middle text-2xl">{product.stock}</p>

        <div className="flex w-1/3">
          <button
            onClick={() => redirectEdit(product)}
            className="mr-5 bg-yellow-400  w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            type="button"
          >
            Editar
          </button>
          <button
            className="bg-red-400  w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            type="submit"
          >
            Deshabilitar
          </button>
        </div>
      </div>
    </>
  );
};
