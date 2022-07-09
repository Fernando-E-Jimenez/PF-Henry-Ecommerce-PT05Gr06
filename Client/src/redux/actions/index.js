import { products } from "../../../dbPrueba";
import { GET_PRODUCTS, PRODUCT_DETAIL, GET_PRODUCTS_FILTER, POST_REVIEW } from "../types";

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

const postReview = (review, id) => {
  return function(dispatch) {
    try {
        /* fetch( `${URLAPI}?id=${id}`, { // verificar como se envia el id por parametro
          method: 'POST',
          body: JSON.stringify(review),
          headers:{
              'Content-Type': 'application/json'
          },
          mode: 'cors'
        })
        .then(response => response.json())
        .then(json => {
          dispatch({ type: POST_REVIEW, payload: json})
        }) */
        const product = products.filter(p => p.id == id);
        product[0].reviews.push(review)
        return dispatch({ type: POST_REVIEW, payload: product})
    } catch (error) {
      dispatch({ type: POST_REVIEW, payload: error });
    }
  }
}


export { getProducts, productDetail, getProductsFilter, postReview };
