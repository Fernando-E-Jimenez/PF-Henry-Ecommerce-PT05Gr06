import { useState, useEffect } from "react";
import Mercadopago from "../Mercadopago/mercadopago.jsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrder, confirmPayment } from "../../redux/actions";
import Spinner from "../Spinner/Spinner";
import "./Checkout.css";
const { VITE_URL_API } = import.meta.env;

export const Checkout = () => {
  const [datos, setDatos] = useState("");
  const idorder = useSelector((state) => state.resultPost);
  const dispatch = useDispatch();
  // const { idorder } = useParams();
  console.log(idorder);
  let data = "";
  if (!isNaN(parseInt(idorder))) {
    console.log(idorder);
    axios
      .get(`${VITE_URL_API}/mercadopago/${idorder}`)
      .then((data) => {
        // setDatos(data.data);
        data = data.data;
        console.info("Contenido de data:", data.url);
        window.location.replace(data.url);
        // window.location.href(data.data.url)
      })
      .catch((err) => console.error(err));
  }

  // useEffect(() => {
  // }, []);
  return (
    <>
      <div className="hidden sm:w-full sm:flex justify-center sm:p-96 spinner">
        <Spinner />

        {/* {!isNaN(parseInt(idorder)) ? <Mercadopago data={data} /> : null} */}
      </div>
      <div className="w-11/12 flex justify-center m-auto mt-20 py-8 rounded-md bg-white">
        <p className="text-2xl text-center text-gray-500">
          Estas siendo redireccionado a Mercado Pago
        </p>
      </div>
    </>
  );
};
