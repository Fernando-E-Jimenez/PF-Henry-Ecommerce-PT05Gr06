import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCategory, getCategory } from "../../redux/actions";

export const CardCategory = ({ category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id, state) => {
    const change = state == "inactivo" ? "activo" : "inactivo";
    const response = confirm(
      `Esta seguro que cambiar el estado actual ${state} de la categoria seleccionada`
    );
    if (response) {
      dispatch(deleteCategory(id));
      alert(`La categoria ahora tiene un estado ${change}`);
      navigate("/admin");
      return true;
    }
    return false;
  };

  const redirectEdit = (category) => {
    navigate(`/admin/edit-category/${category.id}`);
  };

  return (
    <div className="border w-11/12 my-1 m-auto rounded-lg text-xl p-5 flex align-middle sm:justify-between">
      <p className="flex sm:w-full w-1/3  align-middle text-2xl">
        {category.name}
      </p>
      <div className="flex sm:w-1/3 w-2/3">
        <button
          onClick={() => redirectEdit(category)}
          className="mr-5 bg-yellow-400  w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
          type="button"
        >
          Editar
        </button>
        <button
          onClick={() => handleDelete(category.id, category.state.name)}
          className="bg-red-400  w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
          type="submit"
        >
          {category.stateId === 1 ? "Deshabilitar" : "Habilitar"}
        </button>
      </div>
    </div>
  );
};
