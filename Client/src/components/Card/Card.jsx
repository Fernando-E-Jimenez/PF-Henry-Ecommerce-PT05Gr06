import styles from "./Card.module.css";

export const Card = () => {
  return (
    <div className={styles.cardContainer}>
      <img
        className={styles.imagen}
        src="https://http2.mlstatic.com/D_Q_NP_2X_722715-MLA46569073032_062021-N.webp"
        alt="imagen"
      />
      <div className={styles.detail}>
        <p>Cerveza Imperial</p>
        <p>$ 300</p>
        <div className={styles.count}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-minus"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <p>5</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-plus"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
        <button className={styles.button}>Agregar Carrito</button>
      </div>
    </div>
  );
};
