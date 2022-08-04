import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCategory } from "../../redux/actions";
import { useNavigate, Link } from "react-router-dom";

export const EditCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [category, setCategory] = useState({
    name: "",
  });

  const categoryEdit = useSelector((state) => state.categories);
  useEffect(() => {
    setCategory(categoryEdit);
  }, []);

  console.log(categoryEdit);

  const handleSubmit = () => {};

  const handleInputChange = () => {};

  return (
    <div>
      <h1 className="text-center text-3xl">Editar Categoria</h1>
      <hr />
      <form
        onSubmit={handleSubmit}
        className="md:w-1/2 m-auto py-6 px-6 sm:px-6"
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-gray-700 font-bold text-2xl">
            Nombre
          </label>
          <input
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md text-xl"
            type="text"
            id="name"
            value={category.name}
            name="name"
            placeholder="Ingrese el nombre del producto"
            onChange={handleInputChange}
          />
          {/* {errors.name && <p>{errors.name}</p>} */}
        </div>
        <button
          className="bg-primary-color mt-10 w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
          type="submit"
        >
          Agregar
        </button>
      </form>
      <div className="flex w-full align-middle justify-center">
        <Link to="/">
          <button className="bg-red-400 px-20 mt-20 p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors">
            Volver
          </button>
        </Link>
      </div>
    </div>
  );
};
