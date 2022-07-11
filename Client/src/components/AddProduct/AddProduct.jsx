import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import {} from "../actions";
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
      dispatch(postProduct(post)); //depende de como lo llamemos
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
      <h1>Complete todos los campos</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={post.name}
            name="name"
            onChange={(e) => handleInputChange(e)}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Descripción</label>
          <input
            type="text"
            value={post.summary}
            name="summary"
            onChange={(e) => handleInputChange(e)}
          />
          {errors.summary && <p>{errors.summary}</p>}
        </div>
        <div>
          <label>Imagen</label>
          <input
            type="text"
            value={post.image}
            name="image"
            onChange={(e) => handleInputChange(e)}
          />
          {errors.image && <p>{errors.image}</p>}
        </div>
        <div>
          <label>Precio</label>
          <input
            type="text"
            value={post.price}
            name="price"
            onChange={(e) => handleInputChange(e)}
          />
          {errors.price && <p>{errors.price}</p>}
        </div>
        <button type="submit">Agregar</button>
      </form>
      <Link to="/home">
        <button>Volver</button>
      </Link>
    </div>
  );
}
