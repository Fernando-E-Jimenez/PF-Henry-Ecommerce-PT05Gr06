import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CardDetail.module.css";
import { productDetail, productQuantity, addToCart } from "../../redux/actions";
import { useEffect, useState } from "react";
import { Reviews } from "../Reviews/Reviews";

export const CardDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.detail);
  //console.log(product);

  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    setQuantity(quantity + 1);
    dispatch(productQuantity(product.id, quantity));
  };

  const handleDecresed = () => {
    setQuantity(quantity - 1);
    dispatch(productQuantity(product.id, quantity));
  };

  const handleAddCart = (id) => {
    dispatch(addToCart(id));
    alert("Producto agregado al carrito");
  };

  useEffect(() => {
    dispatch(productDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      {product?
          <div className={styles.detailContainer}>
            <div className={styles.imgContainer}>
              <img src={product.image} alt={product} />
              </div>
              <div className={styles.detailBox}>
                <h3 className={styles.title}>{product.name}</h3>
                <p className={styles.price}>{product.price}</p>
                <div className={styles.count}>
                  <button onClick={handleDecresed}>
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
                  </button>
                  <p className={styles.cantidad}>{quantity}</p>
                  <button onClick={handleAdd}>
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
                  </button>
                </div>
                <div className={styles.buttonContainer}>
                  <button
                    onClick={() => handleAddCart(id)}
                    className={styles.button}
                  >
                    Agregar Carrito
                  </button>
                </div>
                <p className={styles.stock}>
                  Stock Disponible: {product.stock}
                </p>
              </div>
            </div>
            <hr></hr>
            <Reviews />
          </div>
      :'Cargando...'}
    </div>
  );
};
