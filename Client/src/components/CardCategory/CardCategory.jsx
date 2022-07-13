import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCategory, getCategory } from "../../redux/actions";

export const CardCategory = ({ category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
    alert("Categoria Eliminada");
    navigate("/admin");
  };

  const redirectEdit = (category) => {
    navigate(`/admin/edit-category/${category.id}`);
  };

  return (
    <div className="border my-1 rounded-lg text-xl p-5 flex align-middle justify-between">
      <p className="flex w-full  align-middle text-2xl">{category.name}</p>
      <div className="flex w-1/3">
        <button
          onClick={() => redirectEdit(category)}
          className="mr-5 bg-yellow-400  w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
          type="button"
        >
          Editar
        </button>
        <button
          onClick={() => handleDelete(category.id)}
          className="bg-red-400  w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
          type="submit"
        >
          Deshabilitar
        </button>
      </div>
    </div>
  );
};
