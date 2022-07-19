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
    if (products.previousPage) {
      setPage(page - 1)
    }
  }

  const nextPage = () => {
    if (products.nextPage) {
      setPage(page + 1)
    }
  }

  useEffect(() => {
    dispatch(getProducts(page, order.type, order.by, order.id));
  }, [dispatch, page, order]);

  return (
    <div className={styles.cardsContainer}>
      {products.data ?
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
            {
            products.previousPage ?
              <button className={styles.button} onClick={() => previousPage()} > 👈 Pagina anterior </button> :
              <button className={styles.button} onClick={() => previousPage()} disabled > 👈 Pagina anterior </button>
            }
            {
            products.nextPage ?
              <button className={styles.button} onClick={() => nextPage()}> Pagina siguiente 👉 </button>:
              <button className={styles.button} onClick={() => nextPage()} disabled> Pagina siguiente 👉 </button>
            }
          </div>
        </div>
        :
        <div className={styles.noResults}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-search"
            width="33"
            height="33"
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
          <br />
          <h3 className={styles.noResultsText}>OH... No pudimos encontrar nada</h3>
        </div>}
    </div>
  );
};
