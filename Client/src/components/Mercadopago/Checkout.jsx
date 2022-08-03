import { useState, useEffect} from 'react'
import Mercadopago from '../Mercadopago/mercadopago.jsx'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrder, confirmPayment } from "../../redux/actions";
const { VITE_URL_API } = import.meta.env;

export const Checkout = () => {
    const [datos, setDatos] = useState("")
    const dispatch = useDispatch();
   const {  idorder } = useParams();
   console.log(idorder)

    useEffect(() => {
      dispatch(getOrder(idorder));
        axios
          .get(`${VITE_URL_API}/mercadopago/${idorder}`)
          .then((data) => {
            setDatos(data.data);
            console.info("Contenido de data:", data);
          })
          .catch((err) => console.error(err));
      }, []);
      return (
       <>
       {<Mercadopago data={datos} />}
       </>
      
      );
}

