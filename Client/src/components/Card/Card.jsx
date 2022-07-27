import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Card.module.css";
import { addToCart } from "../../redux/actions";
import Swal from "sweetalert2";

export const Card = ({ id, name, price, image }) => {
  const dispatch = useDispatch();

  const handleAddCart = (id) => {
    dispatch(addToCart(id));
    Swal.fire({
      icon: "success",
      title: "Producto agregado con exito",
    });
  };

  const precio = price.toLocaleString("es-ar", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });

  return (
    <div className={styles.cardContainer}>
      <Link to={`/product/${id}`}>
        <img className={styles.imagen} src={image} alt="imagen" />
      </Link>
      <div className={styles.detail}>
        <p>{name}</p>
        <p>{precio}</p>

        <button onClick={() => handleAddCart(id)} className={styles.button}>
          Agregar Carrito
        </button>
      </div>
    </div>
  );
};
