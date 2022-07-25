import { useState, useEffect} from 'react'
import Checkout from '../Mercadopago/Checkout'
import axios from 'axios'

function mercadopago(){
    const [datos, setDatos] = useState("")

    useEffect(()=>{
        axios.get("http://localhost:5000/mercadopag")
    })
}
