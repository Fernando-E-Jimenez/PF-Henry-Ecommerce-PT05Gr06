import { useState, useEffect} from 'react'
import Mercadopago from '../Mercadopago/mercadopago.jsx'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrder } from "../../redux/actions";
const { VITE_URL_API } = import.meta.env;

export const Checkout = () => {
    const [datos, setDatos] = useState("")
    const dispatch = useDispatch();
   const { iduser, idorder } = useParams();

    useEffect(() => {
        axios
          .post(`${VITE_URL_API}/mercadopag/${iduser}/${idorder}`)
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

