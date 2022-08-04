import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { corfirmPurchase } from "../../redux/actions/index";
import { useAuth0 } from "@auth0/auth0-react";
import { resetCartUser } from "../../redux/actions";
import { Checkout } from "../Mercadopago/Checkout";
import Swal from "sweetalert2";

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
    name: profile.name ? profile.name : "",
    dni: "",
    address: "",
  });

  let disabled = false;
  if (post.name && post.dni && post.address) {
    disabled = true;
  }

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

  // dispatch(corfirmPurchase(profile.id, post));
  // dispatch(resetCartUser(profile.id));
  // navigate("/mercadopago/1");

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(post);
    Swal.fire({
      icon: "warning",
      title: "¿Confirmar compra?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(corfirmPurchase(profile.id, post));
        dispatch(resetCartUser(profile.id));
        navigate("/mercadopago/1");
      }
    });
  }

  return (
    <div className="w-11/12 sm:w-2/5 m-auto bg-white p-4 mt-6 rounded-md">
      <h1 className="text-primary-color font-bold text-center text-4xl my-10">
        Ya estamos muy cerca de completar la compra
      </h1>
      <hr />
      {isAuthenticated ? (
        <form onSubmit={(e) => handleSubmit(e)} className=" w-4/5 m-auto py-6">
          <div className="mb-5">
            <label className="text-gray-700 font-bold text-2xl">
              Nombre y apellido
            </label>
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
            <label className="text-gray-700 font-bold text-2xl">
              Identificacion
            </label>
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
            <label className="text-gray-700 font-bold text-2xl">
              direccion
            </label>
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
          <div className="flex justify-center mt-6">
            <button
              disabled={disabled === false ? true : false}
              className={`bg-primary-color hover:bg-secondary-color  w-2/5  p-3 font-bold text-white rounded cursor-pointer transition-colors ${
                disabled === false ? "disabled:opacity-25" : ""
              }`}
              type="submit"
            >
              Confirmar
            </button>
          </div>
        </form>
      ) : (
        "Debes iniciar cesion para poder realizar un pedido"
      )}
      <div className="flex w-2/6 m-auto align-middle justify-center">
        <Link to="/">
          <button className="bg-red-400 w-56 p-3 font-bold text-white rounded cursor-pointer hover:bg-red-500 transition-colors">
            Volver
          </button>
        </Link>
        {/* <Checkout/> */}
      </div>
    </div>
  );
};
