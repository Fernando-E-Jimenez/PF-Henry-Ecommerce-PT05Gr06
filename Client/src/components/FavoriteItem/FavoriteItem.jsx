import { useDispatch, useSelector } from "react-redux";
import { removeProduct, removeFromFavoriteUser } from "../../redux/actions";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";

export const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.favorite.cant);
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
        isAuthenticated?
          dispatch(removeFromFavoriteUser(profile.id, id))
          :dispatch(removeProduct(id));
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

  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      <div className="flex w-2/5">
        <div className="w-28">
          <img className="h-36" src={product.image} alt="" />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className=" text-2xl">{product.name}</span>
          <button
            onClick={() => removeProductCart(product.id)}
            className="font-semibold hover:text-red-500 text-gray-500 text-xl"
          >
            Remove
          </button>
        </div>
      </div>
      <span className="text-center w-1/5 text-xl">{priceUnit}</span>
    </div>
  );
};
