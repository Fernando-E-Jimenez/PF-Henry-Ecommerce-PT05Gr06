import { useDispatch, useSelector } from "react-redux";
import { removeFromFavoriteUser } from "../../redux/actions";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";
import "./FavoriteItem.css";
import { Link } from "react-router-dom";

export const FavoriteItem = ({ product }) => {
  const dispatch = useDispatch();
  // const [quantity, setQuantity] = useState(product.favorite.length);
  const profile = useSelector((state) => state.profile);
  const { isAuthenticated } = useAuth0();

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
          ? dispatch(removeFromFavoriteUser(profile.id, id))
          : null;
        Swal.fire(
          "Eliminado!",
          "El producto se ha eliminado correctamente",
          "success"
        );
      }
    });
  };

  // const total = quantity * product.price;

  // useEffect(() => {
  //   total;
  // }, [total]);

  const priceUnit = product.price.toLocaleString("es-ar", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });

  return (
    <>
      <div className="itemContainer w-full">
        <Link to={`/product/${product.id}`} className="md:w-3/5 itemImgTitle">
          <div className="w-28 h-full">
            <img className="h-36" src={product.image} alt="" />
          </div>
          <div className="flex justify-between ml-4 flex-grow itemTitle">
            <span className=" text-2xl">{product.name}</span>
          </div>
        </Link>

        <button
          onClick={() => removeProductCart(product.id)}
          className="font-bold hover:text-red-500 text-gray-500 text-xl md:w-1/5"
        >
          Remover
        </button>
        <span className="text-center w-full md:w-1/5 text-xl font-bold text-gray-500">
          {priceUnit}
        </span>
      </div>
      <hr />
    </>
  );
};
