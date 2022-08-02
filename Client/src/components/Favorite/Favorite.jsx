import { Profiler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteItem } from "../FavoriteItem/FavoriteItem";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { resetCart, resetCartUser } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

export const Cart = () => {
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorite);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const { isAuthenticated } = useAuth0();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    let items = 0;
    let price = 0;
    if (favorite.length > 0) {
      favorite.forEach((item) => {
        items += item.car.cant;
        price += item.car.cant * item.price;
      });
    }
    setTotalItems(items);
    setTotalPrice(price);
  }, [favorite, totalPrice, totalItems, setTotalPrice, setTotalItems]);

  const handleResetCart = () => {
    Swal.fire({
      icon: "warning",
      title: "¿Estas seguro?",
      text: `Estas seguro que desea elminar el carrito completo?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        isAuthenticated ?
          dispatch(resetCartUser(profile.id))
          : dispatch(resetCart());
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

  localStorage.setItem("cartItems", JSON.stringify(cart));

  return (
    <>
      <div className="container mx-auto mt-10 bg-gray-200">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-4xl">Favorite Products</h1>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-3xl w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-3xl w-1/5">
                Price
              </h3>
            </div>
            <div className="mb-20">
              {/* Products */}
              {favorite.length > 0 ?
                favorite.map((product) => (
                  <FavoriteItem key={product.id} product={product} />
                )) : 'Aun no tienes productos en el carrito'}
            </div>
            <div className="flex justify-around">
              <Link
                className="bg-primary-color font-semibold py-3 px-2 rounded-md text-2xl text-white w-56"
                to="/"
              >
                Seguir Comprando
              </Link>
            </div>
          </div>          
        </div>
      </div>
    </>
  );
};
