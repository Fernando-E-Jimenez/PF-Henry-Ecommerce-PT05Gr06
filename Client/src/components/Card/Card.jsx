import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export const Card = ({ id, name, price, image }) => {
  return (
    <Link to={`/product/${id}`} className={styles.cardContainer}>
      <img className={styles.imagen} src={image} alt="imagen" />
      <div className={styles.detail}>
        <p>{name}</p>
        <p>{price}</p>
        <div className={styles.count}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-minus"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="gray"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <p>5</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-plus"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="gray"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
        <button className={styles.button}>Agregar Carrito</button>
      </div>
    </Link>
  );
};
