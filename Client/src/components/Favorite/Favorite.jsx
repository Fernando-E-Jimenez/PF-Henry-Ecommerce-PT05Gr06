import { Profiler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteItem } from "../FavoriteItem/FavoriteItem";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { resetFavorite } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import "./Favorite.css";

export const Favorite = () => {
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorite);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const { isAuthenticated } = useAuth0();
  const profile = useSelector((state) => state.profile);


  const handleResetFavorite = () => {
    Swal.fire({
      icon: "warning",
      title: "¿Estas seguro?",
      text: `¿Estas seguro que desea elminar la lista de favoritos por completo?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        isAuthenticated
          ? dispatch(resetFavorite(profile.id))
          : null;
        Swal.fire(
          "Eliminado!",
          "El carrito se ha eliminado correctamente",
          "success"
        );
      }
    });
  };

  const precio = totalPrice.toLocaleString("es-ar", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });

  localStorage.setItem("favoriteItems", JSON.stringify(favorite));

  return (
    <>
      <div className="container mx-auto w-full h-full favoriteContainer">
        <div className="flex shadow-md my-2 w-full h-full favoriteFlex">
          <div className="bg-white px-10 py-10 favoriteItems">
            <div className="flex justify-center border-b pb-8">
              <h1 className="font-semibold text-4xl">Favorite Products</h1>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-3xl w-4/5 hidden sm:block">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-3xl w-1/5 hidden sm:block">
                Price
              </h3>
            </div>
            <div className="mb-20">
              {/* Products */}
              {favorite.length > 0
                ? favorite.map((product) => (
                  <FavoriteItem key={product.id} product={product} />
                ))
                : "Aun no tienes productos en la lista de favoritos"}
            </div>
            <div className="flex justify-around cartButtons">
              <Link
                className="bg-primary-color hover:bg-secondary-color font-semibold py-3 px-2 rounded-md text-2xl text-white w-3/4 text-center mb-4 sm:mb-0 sm:w-56"
                to="/"
              >
                Seguir Comprando
              </Link>
              <button
                onClick={() => handleResetFavorite()}
                className="bg-red-400 font-semibold hover:bg-red-600 py-3 px-2 rounded-md text-2xl text-white w-3/4 text-center mb-4 sm:mb-0 sm:w-56"
              >
                Reset Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
