import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CardOrder = ({ order }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /* const redirectEdit = (order) => {
    dispatch(obtainEditorder(order));
    navigate(`/admin/edit-order`);
  }; */

  function confirmDispatch() {
    const response = confirm("Esta seguro que desea despachar la mercancia del almacen")
    if(response) {
        return true
    }
    return false
  }

  return (
    <>
      <div className="border my-1 rounded-lg text-xl p-5 flex align-middle justify-between">
        <p className="flex w-4/5 align-center mr-3 text-2xl">{order.name}</p>
        <p className="flex w-1/5 align-middle text-2xl">{order.state}</p>
        <p className="flex w-1/5 align-middle text-2xl">{order.cant}</p>

        <div className="flex w-1/3">
          <button
            onClick={() => confirmDispatch()}
            className="mr-5 bg-yellow-400  w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            type="button"
          >
            Despachar
          </button>
          <button
            className="bg-red-400  w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            type="submit"
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};
