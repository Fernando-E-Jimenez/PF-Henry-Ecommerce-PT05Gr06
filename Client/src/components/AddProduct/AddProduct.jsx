import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createProduct, getCategory } from "../../redux/actions/index";
import styles from "./newProduct.module.css";

function validate(post) {
  let errors = {};
  if (!post.name) {
    errors.name = "Ingrese nombre del producto";
  }
  if (!post.description) {
    errors.description = "Escribe un detalle del producto";
  }
  if (!post.image) {
    errors.image = "Suba una imagen representativa del producto";
  }
  if (!post.price) {
    errors.price = "Ingrese el precio del producto";
  }
  return errors;
}

export default function AddProduct() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const categories = useSelector((state) => state.categories);

  const [errors, setErrors] = useState({});

  const [post, setPost] = useState({
    name: "",
    description: "",
    image: "",
    price: 0,
    stock: 0,
    category: [],
  });

  console.log(post.category);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  function handleInputChange(e) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...post,
        [e.target.name]: e.target.value,
      })
    );
  }

  const handleSelect = (e) => {
    if (post[e.target.name].includes(e.target.value)) return;
    setPost({
      ...post,
      [e.target.name]: [...post[e.target.name], e.target.value],
    });
  };

  const handleDelete = (e, option) => {
    setPost({
      ...post,
      [option]: post[option].filter((data) => data !== e),
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    // if (Object.values(errors).length > 0)
    //   alert("Por favor no deje campos vacios");
    // else {
    //   dispatch(createProduct(post)); //depende de como lo llamemos
    //   alert("Producto agregado con exito");
    // }
    const formData = new FormData(e.target);

    console.log(formData);
    dispatch(createProduct(formData));
    // dispatch(createProduct(post));
    alert("Producto agregado con exito");
    navigate("/admin/view-products");
  }

  return (
    <div>
      <h1 className="text-center text-3xl ">Complete todos los campos</h1>
      <hr />
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="md:w-1/2 m-auto py-6 px-6 sm:px-0"
      >
        <div className="mb-5">
          <label className="text-gray-700 font-bold text-2xl">Nombre</label>
          <input
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md text-xl"
            type="text"
            value={post.name}
            name="name"
            placeholder="Ingrese el nombre del producto"
            onChange={(e) => handleInputChange(e)}
          />
          {/* {errors.name && <p>{errors.name}</p>} */}
        </div>
        <div className="mb-5">
          <label className="text-gray-700 font-bold text-2xl">
            Descripción
          </label>
          <input
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md text-xl"
            type="text"
            value={post.description}
            name="description"
            onChange={(e) => handleInputChange(e)}
          />
          {/* {errors.description && <p>{errors.description}</p>} */}
        </div>
        <div className="mb-5">
          <label className="text-gray-700 font-bold text-2xl">Imagen</label>
          <input
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md text-xl"
            type="file"
            value={post.image}
            name="image"
            onChange={(e) => handleInputChange(e)}
          />
          {/* {errors.image && <p>{errors.image}</p>} */}
        </div>
        <div className="mb-5">
          <label className="text-gray-700 font-bold text-2xl">Precio</label>
          <input
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md text-xl"
            type="text"
            value={post.price}
            name="price"
            onChange={(e) => handleInputChange(e)}
          />
          {/* {errors.price && <p>{errors.price}</p>} */}
        </div>
        <div className="mb-5">
          <label className="text-gray-700 font-bold text-2xl">Stock</label>
          <input
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md text-xl"
            type="text"
            value={post.stock}
            name="stock"
            onChange={(e) => handleInputChange(e)}
          />
          {/* {errors.stock && <p>{errors.stock}</p>} */}
        </div>
        <div className="mb-5">
          <label className="text-gray-700 font-bold text-2xl">
            Seleccionar Categorias
          </label>
          <select
            onChange={handleSelect}
            name="category"
            defaultValue={"Select Categoria"}
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md text-xl"
          >
            <option disabled>Seleccionar Categoria</option>
            {categories?.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          {post.category?.map((e) => (
            <div key={e} className="flex text-xl mt-4 justify-center">
              <div className="w-1/4">{e}</div>
              <button onClick={() => handleDelete(e, "category")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={4}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
          {/* <input
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md text-xl"
            type="text"
            value={post.category}
            name="category"
            onChange={(e) => handleInputChange(e)}
          /> */}
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
}
