import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CardDetail.module.css";
import { productDetail } from "../../redux/actions";
import { useEffect } from "react";
import { Reviews } from "../Reviews/Reviews";

export const CardDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(productDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      {product[0]?
      <div>
        <div className={styles.bgPage}>
          <div className={styles.detailContainer}>
            <div className={styles.imgContainer}>
              <img src={product[0].image} alt={product[0]} />
            </div>
            <div className={styles.detailBox}>
              <h3 className={styles.title}>{product[0].name}</h3>
              <p className={styles.price}>{product[0].price}</p>
              <div className={styles.count}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-minus"
                  width="40"
                  height="40"
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
                <p className={styles.cantidad}>5</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-plus"
                  width="40"
                  height="40"
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
              <div className={styles.buttonContainer}>
                <button className={styles.button}>Agregar Carrito</button>
              </div>
              <p className={styles.stock}>Stock Disponible: {product[0].stock}</p>
            </div>
          </div>
        </div>
        <Reviews />
      </div>
      :'Cargando...'}
    </div>
  );
};
