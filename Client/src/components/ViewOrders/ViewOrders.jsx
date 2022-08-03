import { useEffect, useState } from "react";
import styles from "./ViewOrders.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ordersShow, filterOrderStatus } from "../../redux/actions";
import { CardOrder } from "../CardOrder/CardOrder";

export const ViewOrders = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(0);
  const orders = useSelector((state) => state.orders);
  useEffect(() => {
    dispatch(ordersShow());
    if(filter > 0) {
      dispatch(filterOrderStatus(filter));
    }
  }, [dispatch, filter]);

  const handleChangeFilter = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    dispatch(filterOrderStatus(e.target.value));
  }

  return (
    <>
      <div className={styles.searchViewOrders}>
        <select defaultValue='DEFAULT' className="select" onChange={handleChangeFilter}>
          <option value={'DEFAULT'} disabled >Filtrar</option>
          <option value={3}>🧐 Ver solo las ordenes en estado creada</option>
          <option value={4}>🧐 Ver solo las ordenes en estado procesando</option>
          <option value={5}>🧐 Ver solo las ordenes en estado cancelada</option>
          <option value={6}>🧐 Ver solo las ordenes en estado completa</option>
        </select>
      </div>
      <div className="border bg-gray-300 my-1 rounded-lg text-xl p-5 flex align-middle justify-between">
        <p className="flex w-3/5 align-center text-2xl">Usuario</p>
        <p className="flex w-1/5 align-middle text-2xl">Estado</p>
        <p className="flex w-1/5 align-middle text-2xl">Productos</p>
        <p className="flex w-1/5 align-middle text-2xl">Acciones</p>
      </div>
      <div className="rounded-lg">
        {orders?.length
          ? orders.map((order) => (
              <CardOrder key={order.id} order={order} />
            ))
          : ""}
      </div>
    </>
  );
};
