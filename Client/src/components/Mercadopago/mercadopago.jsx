import { useEffect} from 'react' 
//import axios from 'axios'

const mercadopago = ({ data }) => {
  console.log("MercadoPAgo.Jsx")
  window.location.href(data.url)
 useEffect(()=>{
  const script = document.createElement('script');
  const attr_data_preference = document.createAttribute('data-preference-id')
  // const attr_nonce = document.createAttribute('nonce')

  attr_data_preference.value = data.id
  //attr_nonce.value = 'abcdefg'
  script.src=data.url;
  // script.src="https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js";
  script.setAttributeNode(attr_data_preference)
 // script.setAttributeNode(attr_nonce)
console.log(data, " data")
  
  document.getElementById('form1').appendChild(script)
  return () =>{
    document.getElementById('form1').removeChild(script);
  }
 },[data])
return(
  <div>
      <form id='form1'></form>
     </div>
    )
}

export default mercadopago;