import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {createProduct} from "../actions";
import styles from "./newProduct.module.css";

function validate(post) {
  let errors = {};
  if (!post.name) {
    errors.name = "Ingrese nombre del producto";
  }
  if (!post.summary) {
    errors.summary = "Escribe un detalle del producto";
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
  const [errors, setErrors] = useState({});

  const [post, setPost] = useState({
    name: "",
    summary: "",
    image: "",
    price: 0,
  });

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

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(errors).length > 0)
      alert("Por favor no deje campos vacios");
    else {
      dispatch(createProduct(post)); //depende de como lo llamemos
      alert("Producto agregado con exito");
    }
  }

  function handleSteps(e) {
    setPost({
      ...post,
      stepByStep: [e.target.value],
    });
    setErrors(
      validate({
        ...post,
        stepByStep: e.target.value,
      })
    );
  }

  return (
    <div>
      <h1 className="text-center text-3xl">Complete todos los campos</h1>
      <hr />
      <form onSubmit={(e) => handleSubmit(e)} className="md:w-1/2 m-auto py-6">
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
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div className="mb-5">
          <label className="text-gray-700 font-bold text-2xl">
            Descripción
          </label>
          <input
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md text-xl"
            type="text"
            value={post.summary}
            name="summary"
            onChange={(e) => handleInputChange(e)}
          />
          {errors.summary && <p>{errors.summary}</p>}
        </div>
        <div className="mb-5">
          <label className="text-gray-700 font-bold text-2xl">Imagen</label>
          <input
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md text-xl"
            type="text"
            value={post.image}
            name="image"
            onChange={(e) => handleInputChange(e)}
          />
          {errors.image && <p>{errors.image}</p>}
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
          {errors.price && <p>{errors.price}</p>}
        </div>
        <div className="mb-5">
          <label className="text-gray-700 font-bold text-2xl">Categoria</label>
          <input
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md text-xl"
            type="text"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <button
          className="bg-primary-color mt-10 w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
          type="submit"
        >
          Agregar
        </button>
      </form>
      <div className="flex w-full align-middle justify-center">
        <Link to="/home">
          <button className="bg-red-400 px-20 mt-20 p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors">
            Volver
          </button>
        </Link>
      </div>
    </div>
  );
}
