import { products } from "../../../dbPrueba";
import {
  GET_PRODUCTS,
  PRODUCT_DETAIL,
  GET_PRODUCTS_FILTER,
  POST_REVIEW,
  NEW_CATEGORY,
  GET_CATEGORIES,
  NEW_PRODUCT,
  CHANGE_ORDER
} from "../types";
import axios from "axios";

const URLAPI = "http://localhost:3001/";

const getProducts = (page, order, by) => {
  return async (dispatch) => {
    try {
      return fetch(`${URLAPI}guess/product?page=${page}&order_direction=${order}&order_by=${by}`)
        .then(response => response.json())
        .then(json => {
          dispatch({ type: GET_PRODUCTS, payload: json})
        })
    } catch (error) {
      dispatch({type: GET_PRODUCTS, payload: error})
    }
  };
};

const productDetail = (id) => {
  return function (dispatch) {
    try {
      return fetch(`${URLAPI}guess/product/${id}`)
        .then(response => response.json())
        .then(json => {
          dispatch({ type: PRODUCT_DETAIL , payload: json})
        })
    } catch (error) {
      dispatch({type: PRODUCT_DETAIL, payload: error})
    }
  };
};

const getProductsFilter = (name) => {
  return function (dispatch) {
    try {
      return fetch(`${URLAPI}guess/product?name=${name}`)
        .then(response => response.json())
        .then(json => {
          dispatch({ type: GET_PRODUCTS_FILTER, payload: json.data})
        })
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_FILTER, payload: error });
    }
  };
};

const postReview = (review, id) => {
  return function (dispatch) {
    try {
      return fetch( `${URLAPI}guess/product/${id}`, {
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
        })
    } catch (error) {
      dispatch({ type: POST_REVIEW, payload: error });
    }
  };
};

const createCategory = (payload) => {
  return async (dispatch) => {
    try {
      const category = await axios.post(
        "http://localhost:3001/admin/category",
        payload
      );
      console.log(category);
      return dispatch({
        type: NEW_CATEGORY,
        payload: category,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getCategory = () => {
  return async (dispatch) => {
    try {
      const categories = await axios.get(
        "http://localhost:3001/admin/category"
      );
      return dispatch({
        type: GET_CATEGORIES,
        payload: categories.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// const getProductByName = () => {
//   try {
//     const product = await axios.get(

//     )
//   }
// }
const createProduct = (payload) => {
  return async (dispatch) => {
    try {
      const product = await axios.post(
        "http://localhost:3001/admin/product",
        payload
      );
      console.log(product);
      return dispatch({
        type: NEW_PRODUCT,
        payload: product,
      });
    } catch (error) {
      console.log(error);
    }
  };
};


const changeOrder = (type, by) => {
  return (dispatch) => {
    try {
      return dispatch({ type: CHANGE_ORDER, payload: { type, by }})
    } catch (error) {
      console.log(error);
    }
  }
}

export {
  getProducts,
  productDetail,
  getProductsFilter,
  postReview,
  createCategory,
  getCategory,
  createProduct,
  changeOrder
};
