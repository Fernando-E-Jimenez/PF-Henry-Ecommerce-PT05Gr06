import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createCategory } from "../../redux/actions";
// import {} from "../actions";
import styles from "./newProduct.module.css";

const validate = (category) => {
  let errors = {};
  if (!category.name) {
    errors.name = "Ingrese nombre del producto";
  }
};

const AddCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...category,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (Object.values(errors).length > 0)
    //   alert("Por favor no deje campos vacios");
    // else {
    //   dispatch(createCategory(category)); //depende de como lo llamemos
    //   alert("Producto agregado con exito");
    // }
    dispatch(createCategory(category));
    alert("Categoria agregada con exito");
    navigate("/admin/view-categories");
  };

  return (
    <div>
      <h1 className="text-center text-3xl">Complete todos los campos</h1>
      <hr />
      <form
        onSubmit={handleSubmit}
        className="md:w-1/2 m-auto py-6 px-6 sm:px-0"
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

export default AddCategory;
