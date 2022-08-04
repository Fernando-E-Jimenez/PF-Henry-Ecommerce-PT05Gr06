import { useDispatch, useSelector } from "react-redux";
import {
  removeProduct,
  productQuantity,
  addToCartDetailUser,
  removeProductUser,
} from "../../redux/actions";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";
import "./CartItem.css";

export const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.car.cant);
  const profile = useSelector((state) => state.profile);
  const { isAuthenticated } = useAuth0();

  const handleAdd = () => {
    setQuantity(quantity + 1);
    isAuthenticated
      ? dispatch(addToCartDetailUser(profile.id, product.id, quantity + 1))
      : dispatch(productQuantity(product.id, quantity + 1));
  };

  const handleDecresed = () => {
    setQuantity(quantity - 1);
    isAuthenticated
      ? dispatch(addToCartDetailUser(profile.id, product.id, quantity - 1))
      : dispatch(productQuantity(product.id, quantity - 1));
  };

  const removeProductCart = (id) => {
    Swal.fire({
      icon: "warning",
      title: "¿Estas seguro?",
      text: `Estas seguro que desea elminar el producto ${product.name}`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        isAuthenticated
          ? dispatch(removeProductUser(profile.id, id))
          : dispatch(removeProduct(id));
        Swal.fire(
          "Eliminado!",
          "El producto se ha eliminado correctamente",
          "success"
        );
      }
    });
  };

  const total = quantity * product.price;

  useEffect(() => {
    total;
  }, [total]);

  const priceUnit = product.price.toLocaleString("es-ar", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });

  const precio = total.toLocaleString("es-ar", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });

  return (
    <>
      <div className="itemContainer -mx-8 px-6 py-5 text-2xl">
        <div className="md:w-2/5 itemImgTitle">
          <div className="w-28">
            <img className="h-36" src={product.image} alt="" />
          </div>
          <div className=" flex justify-between ml-4 flex-grow itemTitle">
            <span className=" text-2xl">{product.name}</span>
          </div>
        </div>
        <div className="itemQuantity mb-4 sm:mb-0 sm:w-1/5 ">
          <button
            className={quantity === 1 ? "disabled:opacity-25" : ""}
            disabled={quantity === 1 ? true : false}
            onClick={handleDecresed}
          >
            <svg
              className="fill-current text-gray-600 w-3"
              viewBox="0 0 448 512"
            >
              <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>
          </button>

          <p className="mx-2 border text-center w-8 border-none">{quantity}</p>

          <button onClick={handleAdd}>
            <svg
              className="fill-current text-gray-600 w-3"
              viewBox="0 0 448 512"
            >
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>
          </button>
        </div>
        <span className="text-center sm:w-1/5 ">{priceUnit}</span>
        <span className="text-center sm:w-1/5  font-bold">Total: {precio}</span>
      </div>
      <button
        onClick={() => removeProductCart(product.id)}
        className="font-semibold hover:text-red-500 text-gray-500 text-xl w-full mb-5"
      >
        Remove
      </button>
      <hr />
    </>
  );
};
