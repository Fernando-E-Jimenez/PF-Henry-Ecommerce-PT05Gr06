import { useEffect, useState } from "react";
import styles from "./ViewOrders.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ordersShow, getProductsFilter, changeOrder } from "../../redux/actions";
import { CardOrder } from "../CardOrder/CardOrder";

export const ViewOrders = () => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState('');

  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(ordersShow());
  }, [dispatch]);

  return (
    <>
      <div className={styles.searchViewOrders}>
        <button onClick={() => dispatch(changeOrder('ASC', 'name'))}>⏫ Ordenar de la A-Z</button>
        <button onClick={() => dispatch(changeOrder('DESC', 'name'))}>⏬ Ordenar de la Z-A</button>
        <button onClick={() => dispatch(changeOrder('ASC', 'price'))}>🧐 Ver solo las ordenes en estado creada</button>
        <form className={styles.searchContainer} onSubmit={(e) => {
          e.preventDefault();
          dispatch(getProductsFilter(order))
          setOrder('')
        }}>
          <input 
            className={styles.searchBar} 
            placeholder="Search" 
            value={order}
            onChange={e => setOrder(e.target.value)}
          />
          <button type='submit'>🔍</button>
        </form>
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
