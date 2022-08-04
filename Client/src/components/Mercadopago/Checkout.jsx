import { useState, useEffect } from 'react'
import Mercadopago from '../Mercadopago/mercadopago.jsx'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrder, confirmPayment } from "../../redux/actions";
const { VITE_URL_API } = import.meta.env;

export const Checkout = () => {
  const [datos, setDatos] = useState("")
  const idorder = useSelector((state) => state.resultPost);
  const dispatch = useDispatch();
  // const { idorder } = useParams();
  console.log(idorder)
  let data = ""
  if (!isNaN(parseInt(idorder))) {
    console.log(idorder)
    axios
      .get(`${VITE_URL_API}/mercadopago/${idorder}`)
      .then((data) => {
        // setDatos(data.data);
        data = data.data
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
    <h1>Estas Siendo Redireccionado a Mercado Pago</h1>
      
      {/* {!isNaN(parseInt(idorder)) ? <Mercadopago data={data} /> : null} */}
    </>

  );
}

