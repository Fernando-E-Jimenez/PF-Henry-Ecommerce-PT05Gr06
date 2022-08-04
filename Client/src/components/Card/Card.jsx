import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Card.css";
import {
  addToCart,
  addToCartUser,
  addToFavoriteUser,
  addToFavorite,
} from "../../redux/actions";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";

export const Card = ({ id, name, price, image }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const favorite = useSelector((state) => state.favorite);

  let favArray = [];
  for (let i = 0; i < favorite.length; i++) {
    const fav = favorite[i];
    favArray.push(fav.id);
  }

  const { isAuthenticated } = useAuth0();

  const handleAddCart = (id) => {
    isAuthenticated
      ? dispatch(addToCartUser(profile.id, id))
      : dispatch(addToCart(id));
    Swal.fire({
      icon: "success",
      title: "Producto agregado con exito",
    });
  };

  const handleAddFavorite = (id) => {
    isAuthenticated
      ? dispatch(addToFavoriteUser(profile.id, id))
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
      <button className="btnFavorite" onClick={(e) => handleAddFavorite(id)}>
        {isAuthenticated ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-heart"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#7e52a0"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
          </svg>
        ) : null}
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
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};
