import { products } from "../../../dbPrueba";
import { GET_PRODUCTS, PRODUCT_DETAIL, GET_PRODUCTS_FILTER } from "../types";

const URLAPI = 'http://localhost:3001/'

const getProducts = () => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: GET_PRODUCTS,
        payload: products,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const productDetail = (id) => {
  return function(dispatch) {
    try {
      const product = products.filter(p => p.id == id);
      return dispatch({
        type: PRODUCT_DETAIL,
        payload: product,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getProductsFilter = (name) => {
  return function(dispatch) {
    try {
      /* fetch(`${URLAPI}?name=${name}`)
        .then(response => response.json())
        .then(json => {
          dispatch({ type: GET_PRODUCTS_FILTER, payload: json})
        }) */
        const product = products.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))
        return dispatch({ type: GET_PRODUCTS_FILTER, payload: product})
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_FILTER, payload: error });
    }
  }
}



export { getProducts, productDetail, getProductsFilter };
