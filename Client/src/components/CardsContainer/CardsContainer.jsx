import React from "react";
import { Card } from "../Card/Card";
import styles from "./CardsContainer.module.css";
import { getProducts } from "../../redux/actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const CardsContainer = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.boxContainer}>
        {products.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};
