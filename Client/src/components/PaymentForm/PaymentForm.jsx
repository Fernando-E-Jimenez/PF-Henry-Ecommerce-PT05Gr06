import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { corfirmPurchase } from "../../redux/actions/index";
import { useAuth0 } from "@auth0/auth0-react";
import { resetCartUser } from "../../redux/actions";

function validate(post) {
  let errors = {};
  if (!post.name) {
    errors.name = "Ingrese su nombre";
  }
  if (!post.direccion) {
    errors.direccion = "Ingrese su direccion";
  }
  if (!post.dni) {
    errors.dni = "Ingrese su numero de identificacion";
  }
  return errors;
}

export const PaymentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile);
  const { isAuthenticated } = useAuth0();
  const [errors, setErrors] = useState({});

  const [post, setPost] = useState({
    name: profile.name?profile.name:'',
    dni: '',
    address: '',
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
    console.log(post);
    dispatch(corfirmPurchase(profile.id,post));
    alert("Compra confirmada continua con el proceso de pago");
    navigate("/purchases");
    dispatch(resetCartUser(profile.id))
  }

  return (
    <div>
      
      <h1 className="text-center text-3xl">Ya estamos muy cerca de completar la compra</h1>
      <hr />
      {isAuthenticated?
      <form onSubmit={(e) => handleSubmit(e)} className="md:w-1/2 m-auto py-6">
          <div className="mb-5">
          <label className="text-gray-700 font-bold text-2xl">Nombre y apellido</label>
          <input
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md text-xl"
            type="text"
            value={post.name}
            name="name"
            placeholder="Ingrese su nombre y apellido"
            onChange={(e) => handleInputChange(e)}
          />
          {/* {errors.name && <p>{errors.name}</p>} */}
        </div>
        <div className="mb-5">
          <label className="text-gray-700 font-bold text-2xl">Identificacion</label>
          <input
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md text-xl"
            type="text"
            value={post.dni}
            name="dni"
            placeholder="Ingrese su numero de identificacion"
            onChange={(e) => handleInputChange(e)}
          />
          {/* {errors.dni && <p>{errors.dni}</p>} */}
        </div>
        <div className="mb-5">
          <label className="text-gray-700 font-bold text-2xl">direccion</label>
          <input
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md text-xl"
            type="text"
            value={post.address}
            name="address"
            placeholder="Ingrese su direccion"
            onChange={(e) => handleInputChange(e)}
          />
          {/* {errors.direccion && <p>{errors.direccion}</p>} */}
        </div>
        <button
          className="bg-primary-color mt-10 w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
          type="submit"
        >
          Confirmar
        </button>
      </form>: 'Debes iniciar cesion para poder realizar un pedido'}
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