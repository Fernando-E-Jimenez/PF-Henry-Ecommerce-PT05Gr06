import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  obtainEditProduct,
  disableProduct,
  viewProducts,
} from "../../redux/actions";

export const CardProduct = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirectEdit = (product) => {
    dispatch(obtainEditProduct(product));
    navigate(`/admin/edit-product`);
  };

  const confirmChange = (id, state) => {
    const change = state == "inactivo" ? "activo" : "inactivo";
    const response = confirm(
      `Esta seguro que cambiar el estado actual ${state} del producto seleccionado`
    );
    if (response) {
      dispatch(disableProduct(id));
      alert(`El producto ahora tiene un estado ${change}`);
      navigate("/admin");
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="border my-1 rounded-lg text-xl p-5 flex flex-col sm:flex-row align-middle justify-between">
        <div className="flex sm:w-3/5">
          <p className="flex w-3/5 align-center mr-3 text-2xl">
            {product.name}
          </p>
          <p className="flex w-1/5 align-middle text-2xl">{product.price}</p>
          <p className="flex w-1/5 align-middle text-2xl">{product.stock}</p>
        </div>
        <div className="flex sm:w-2/5 justify-around mt-6 sm:mt-0">
          <button
            onClick={() => redirectEdit(product)}
            className="mr-5 bg-yellow-400  w-2/5 p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            type="button"
          >
            Editar
          </button>
          <button
            onClick={() => confirmChange(product.id, product.state.name)}
            className="bg-red-400  w-2/5 p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            type="button"
          >
            {product.stateId === 1 ? "Deshabilitar" : "Habilitar"}
          </button>
        </div>
      </div>
    </>
  );
};
