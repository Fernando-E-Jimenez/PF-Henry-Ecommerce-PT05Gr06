import React from "react";
import { Card } from "../Card/Card";
import styles from "./CardsContainer.module.css";
import { getProducts } from "../../redux/actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const CardsContainer = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const order = useSelector((state) => state.order);
  const [page, setPage] = useState(1)

  const previousPage = () => {
    if(products.previousPage) {
      setPage(page - 1)
    }
  }

  const nextPage = () => {
    if(products.nextPage) {
      setPage(page + 1)
    }
  }
  
  useEffect(() => {
    dispatch(getProducts(page, order.type, order.by));
  }, [dispatch, page, order]);

  return (
    <div className={styles.cardsContainer}>
      {products.data?
      <div>
        <div className={styles.boxContainer}>
          {products.data.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
        <div className={styles.container}>
          <button className={styles.button} onClick={()=>previousPage()}> 👈 Pagina anterior </button>
          <button className={styles.button} onClick={()=>nextPage()}> Pagina siguiente 👉 </button>
        </div>
      </div>
      :'Cargando...'}
    </div>
  );
};
