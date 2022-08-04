import { useEffect, useState } from "react";
import "./ViewOrders.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ordersShow,
  filterOrderStatus,
  filterOrderName,
} from "../../redux/actions";
import { CardOrder } from "../CardOrder/CardOrder";

export const ViewOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const [user, setUser] = useState("");

  useEffect(() => {
    dispatch(ordersShow());
  }, [dispatch]);

  const handleChangeFilter = (e) => {
    e.preventDefault();
    dispatch(filterOrderStatus(e.target.value));
  };

  return (
    <>
      <div className="searchViewOrders sm:flex w-11/12 sm:w-4/5 m-auto sm:justify-between">
        <form
          className="searchContainer rounded-none w-4/5 m-auto sm:w-2/5 borderCss"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(filterOrderName(user));
            setUser("");
          }}
        >
          <div className="searchBar ">
            <input
              className="searchBar"
              placeholder="Buscar usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-search"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#9e9e9e"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </button>
        </form>
        <select
          defaultValue="DEFAULT"
          className="select mt-0  text-gray-500 flex m-auto w-4/5 sm:w-2/5"
          onChange={handleChangeFilter}
        >
          <option value={"DEFAULT"} disabled>
            Filtrar
          </option>

          <option value={3}>🧐 Ver solo las ordenes en estado creada</option>
          <option value={4}>
            🧐 Ver solo las ordenes en estado procesando
          </option>
          <option value={5}>🧐 Ver solo las ordenes en estado cancelada</option>
          <option value={6}>🧐 Ver solo las ordenes en estado completa</option>
        </select>
      </div>
      <div className="border bg-gray-300 my-1 rounded-lg text-xl p-5 hidden sm:flex align-middle justify-between">
        <p className="flex w-2/12 align-center text-2xl">Usuario</p>
        <p className="flex w-2/12 align-middle text-2xl">Estado</p>
        <p className="flex w-3/12 align-middle text-2xl ">Productos</p>
        <p className="flex w-3/12 align-middle text-2xl justify-center">
          Cantidad
        </p>

        <p className="flex w-2/12 align-middle text-2xl justify-center">
          Acciones
        </p>
      </div>
      <div className="rounded-lg">
        {orders?.length
          ? orders.map((order) => <CardOrder key={order.id} order={order} />)
          : ""}
      </div>
    </>
  );
};
