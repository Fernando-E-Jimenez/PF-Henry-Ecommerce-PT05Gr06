import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { changeOrderStatus } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import "./CardOrder.css";

export const CardOrder = ({ order }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeStatus = (idStatus, status) => {
    const response = confirm(
      `Esta seguro que desea ${status} la orden de compra`
    );
    if (response) {
      dispatch(changeOrderStatus(order.id, idStatus));
      navigate("/admin");
      return true;
    }
    return false;
  };

  // const newProduct = useMemo(() => {
  //   return product.name.length > 17
  //     ? product.name.substring(0, 17) + "..."
  //     : product.name;
  // }, [product.name]);

  return (
    <>
      <div className="border my-1 rounded-lg text-xl p-5 sm:flex align-middle grid grid-cols-2 grid-rows-2">
        <p className="flex w-full sm:w-2/12 align-center mr-3 text-2xl">
          {order.user.name}
        </p>
        <p className="flex w-full sm:w-2/12 align-middle text-2xl">
          {order.state.name}
        </p>
        <div className="sm:w-6/12">
          {order.products.map((product) => (
            <div key={product.id} className="flex">
              {/* <img className={styles.imagen} src={product.image} alt="imagen" /> */}
              <p className="flex sm:hidden w-4/5 sm:w-1/2 align-center mr-3 text-2xl">
                {product.name.length > 40
                  ? product.name.substring(0, 40) + "..."
                  : product.name}
              </p>
              <p className="sm:flex hidden sm:w-1/2 align-center mr-3 text-2xl">
                {product.name}
              </p>
              <p className="flex w-1/5 align-center sm:mr-3 text-2xl justify-center">
                {product.productXorder.cant}
              </p>
            </div>
          ))}
        </div>
        <div className="flex w-full sm:w-2/12 flex-col sm:flex-row">
          <button
            onClick={() => changeStatus(4, "Procesar")}
            className="sm:mr-5 bg-yellow-400 h-12 flex align-middle w-4/5 mb-1 sm:w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            type="button"
          >
            Procesar
          </button>
          <button
            onClick={() => changeStatus(6, "Enviar")}
            className="sm:mr-5 bg-yellow-400  h-12 flex align-middle w-4/5 mb-1 sm:w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            type="button"
          >
            Enviar
          </button>
          <button
            onClick={() => changeStatus(5, "Cancelar")}
            className="bg-red-400  w-4/5 mb-1 sm:w-full h-12 flex align-middle p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            type="submit"
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};
