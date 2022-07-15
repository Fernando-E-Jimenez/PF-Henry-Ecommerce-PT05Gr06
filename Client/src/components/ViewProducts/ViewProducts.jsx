import { useEffect, useState } from "react";
import styles from "./ViewProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import { viewProducts, getProductsFilter, changeOrder } from "../../redux/actions";
import { CardProduct } from "../CardProduct/CardProduct";

export const ViewProducts = () => {
  const dispatch = useDispatch();
  const [drink, setDrink] = useState('');

  const products = useSelector((state) => state.products);
  const order = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(viewProducts('',order.type, order.by));
  }, [dispatch, order]);

  return (
    <>
      <div className={styles.searchViewProducts}>
        <button onClick={() => dispatch(changeOrder('ASC', 'name'))}>⏫ Ordenar de la A-Z</button>
        <button onClick={() => dispatch(changeOrder('DESC', 'name'))}>⏬ Ordenar de la Z-A</button>
        <button onClick={() => dispatch(changeOrder('ASC', 'price'))}>➖ Ordenar del menor al mayor precio</button>
        <button onClick={() => dispatch(changeOrder('DESC', 'price'))}>➕ Ordenar del mayor al menor precio</button>
        <form className={styles.searchContainer} onSubmit={(e) => {
          e.preventDefault();
          dispatch(getProductsFilter(drink))
          setDrink('')
        }}>
          <input 
            className={styles.searchBar} 
            placeholder="Search" 
            value={drink}
            onChange={e => setDrink(e.target.value)}
          />
          <button type='submit'>🔍</button>
        </form>
      </div>
      <div className="border bg-gray-300 my-1 rounded-lg text-xl p-5 flex align-middle justify-between">
        <p className="flex w-3/5 align-center text-2xl">Name</p>
        <p className="flex w-1/5 align-middle text-2xl">Price</p>
        <p className="flex w-1/5 align-middle text-2xl">Stock</p>
        <p className="flex w-1/5 align-middle text-2xl">Acciones</p>
      </div>
      <div className="rounded-lg">
        {products.data?.length
          ? products.data.map((product) => (
              <CardProduct key={product.id} product={product} />
            ))
          : ""}
      </div>
    </>
  );
};
