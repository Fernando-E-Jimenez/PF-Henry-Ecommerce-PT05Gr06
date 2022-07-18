import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Card.module.css";
import { addToCart } from "../../redux/actions";

export const Card = ({ id, name, price, image }) => {
  const dispatch = useDispatch();

  const handleAddCart = (id) => {
    dispatch(addToCart(id));
    alert("Producto agregado al carrito");
  };

  return (
    <div className={styles.cardContainer}>
      <Link to={`/product/${id}`}>
        <img className={styles.imagen} src={image} alt="imagen" />
      </Link>
      <div className={styles.detail}>
        <p>{name}</p>
        <p>{price}</p>

        <button onClick={() => handleAddCart(id)} className={styles.button}>
          Agregar Carrito
        </button>
      </div>
    </div>
  );
};
