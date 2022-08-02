import React from "react";
import { useDispatch } from "react-redux";
import { changeOrderStatus } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

export const CardOrder = ({ order }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeStatus = (idStatus, status) => {
    const response = confirm(`Esta seguro que desea ${status} la orden de compra`)
    if(response) {
      dispatch(changeOrderStatus(order.id ,idStatus))
      navigate("/admin");
      return true
    }
    return false
  }

  return (
    <>
      <div className="border my-1 rounded-lg text-xl p-5 flex align-middle justify-between">
        <p className="flex w-4/5 align-center mr-3 text-2xl">{order.user.name}</p>
        <p className="flex w-1/5 align-middle text-2xl">{order.state.name}</p>
        {order.products.map((product) => (
                        <div key={product.id}>
                            {/* <img className={styles.imagen} src={product.image} alt="imagen" /> */}
                            <p className="flex w-4/5 align-center mr-3 text-2xl">{product.name}</p>
                            <p className="flex w-4/5 align-center mr-3 text-2xl">{product.productXorder.cant}</p>
                        </div>
          ))}
        <div className="flex w-1/3">
          <button
            onClick={() => changeStatus(4, 'Procesar')}
            className="mr-5 bg-yellow-400  w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            type="button"
          >
            Procesar
          </button>
          <button
            onClick={() => changeStatus(6, 'Enviar')}
            className="mr-5 bg-yellow-400  w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            type="button"
          >
            Enviar
          </button>
          <button
            onClick={() => changeStatus(5, 'Cancelar')}
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
