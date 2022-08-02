import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./CardDetail.css";
import {
  productDetail,
  addToCartDetailUser,
  addToCartDetail,
} from "../../redux/actions";
import { useEffect, useState } from "react";
import { Reviews } from "../Reviews/Reviews";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

export const CardDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.detail);
  const cart = useSelector((state) => state.cart);
  const profile = useSelector((state) => state.profile);
  const { isAuthenticated } = useAuth0();
  localStorage.setItem("cartItems", JSON.stringify(cart));

  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    setQuantity(quantity + 1);
    //dispatch(productQuantity(id, quantity));
  };

  const handleDecresed = () => {
    setQuantity(quantity - 1);
    //dispatch(productQuantity(id, quantity));
  };

  const handleAddCart = (id, quantity) => {
    isAuthenticated
      ? dispatch(addToCartDetailUser(profile.id, id, quantity))
      : dispatch(addToCartDetail(id, quantity));
    Swal.fire({
      icon: "success",
      title: "Producto agregado con exito",
    });
  };

  useEffect(() => {
    dispatch(productDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      {product ? (
        <div className="detailContainer">
          <div className="card">
            <div className="imgContainer">
              <img src={product.image} alt={product} />
            </div>
            <div className="detailBox">
              <h3 className="title text-4xl">{product.name}</h3>
              <p className="price text-2xl">{product.price}</p>
              <div className="count">
                <button
                  onClick={handleDecresed}
                  className={quantity === 1 ? "disabled:opacity-25" : ""}
                  disabled={quantity === 1 ? true : false}
                >
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
                </button>
                <p className="cantidad text-3xl">{quantity}</p>
                <button onClick={handleAdd}>
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
                </button>
              </div>
              <div className="buttonContainer">
                <button
                  onClick={() => handleAddCart(id, quantity)}
                  className="secondaryButton"
                >
                  Agregar Carrito
                </button>
              </div>
              <p className="stock">Stock Disponible: {product.stock}</p>
            </div>
          </div>

          <Reviews />
        </div>
      ) : (
        "Cargando..."
      )}
    </div>
  );
};
