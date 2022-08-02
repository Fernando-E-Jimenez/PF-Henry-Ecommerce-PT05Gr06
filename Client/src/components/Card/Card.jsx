import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Card.css";
import { addToCart, addToCartUser, addToFavoriteUser, addToFavorite  } from "../../redux/actions";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";

export const Card = ({ id, name, price, image }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const { isAuthenticated } = useAuth0();

  const handleAddCart = (id) => {
    isAuthenticated ?
      dispatch(addToCartUser(profile.id, id))
      : dispatch(addToCart(id));
    Swal.fire({
      icon: "success",
      title: "Producto agregado con exito",
    });
  };

  const handleAddFavorite = (id) => {
    isAuthenticated ?
      dispatch(addToFavoriteUser(profile.id, id))
      : dispatch(addToFavorite(id));
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
    <div className="cardContainer">
      <button className="cardFavorite" onClick={(e) => handleAddFavorite(id)}>
        {
          "❤"
        }
      </button>
      <Link to={`/product/${id}`}>
        <img className="imagen" src={image} alt="imagen" />
      </Link>
      <div className="detail">
        <p className="detailName">{name}</p>
        <p>{precio}</p>

        <button
          onClick={() => handleAddCart(id)}
          className="secondaryButton button"
        >
          Agregar Carrito
        </button>
      </div>
    </div>
  );
};
