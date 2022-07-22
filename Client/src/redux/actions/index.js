import { products } from "../../../dbPrueba";
import {
  GET_PRODUCTS,
  PRODUCT_DETAIL,
  GET_PRODUCTS_FILTER,
  POST_REVIEW,
  NEW_CATEGORY,
  GET_CATEGORIES,
  NEW_PRODUCT,
  CHANGE_ORDER,
  GET_PRODUCT,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  EDIT_PRODUCT,
  EDIT_PRODUCT_OBTENER,
  ADD_TO_CART,
  PRODUCT_QUANTITY,
  REMOVE_FROM_CART,
  ADD_TO_CART_DETAIL,
  RESET_CART,
} from "../types";
import axios from "axios";

// const VITE_URL_API = "http://localhost:3001/";
// const { VITE_URL_API } = process.env.NODE_ENV;
const { VITE_URL_API } = import.meta.env;

console.log("Hola: " + VITE_URL_API);

const getProducts = (page, order, by, id) => {
  return (dispatch) => {
    try {
      return fetch(
        `${VITE_URL_API}/guess/product?page=${page}&order_direction=${order}&order_by=${by}&category=${id}`
      )
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: GET_PRODUCTS, payload: json });
        });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS, payload: error });
    }
  };
};

const productDetail = (id) => {
  return function (dispatch) {
    try {
      return fetch(`${VITE_URL_API}/guess/product/${id}`)
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: PRODUCT_DETAIL, payload: json });
        });
    } catch (error) {
      dispatch({ type: PRODUCT_DETAIL, payload: error });
    }
  };
};

const getProductsFilter = (name) => {
  return function (dispatch) {
    try {
      return fetch(`${VITE_URL_API}/guess/product?name=${name}`)
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: GET_PRODUCTS_FILTER, payload: json });
        });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_FILTER, payload: error });
    }
  };
};

const postReview = (review, id) => {
  return function (dispatch) {
    try {
      return fetch(`${VITE_URL_API}/user/product/${id}/review`, {
        method: "POST",
        body: JSON.stringify(review),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      })
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: POST_REVIEW, payload: json });
        });
    } catch (error) {
      dispatch({ type: POST_REVIEW, payload: error });
    }
  };
};

const createCategory = (payload) => {
  return async (dispatch) => {
    try {
      const category = await axios.post(
        `${VITE_URL_API}/admin/category`,
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
      const categories = await axios.get(`${VITE_URL_API}/admin/category`);
      return dispatch({
        type: GET_CATEGORIES,
        payload: categories.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// Trae todos los productos al admin y los pone en la tabla
const getProduct = () => {
  return async (dispatch) => {
    try {
      const products = await axios.get(`${VITE_URL_API}/guess/product`);
      return dispatch({
        type: GET_PRODUCT,
        payload: products.data,
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
        `${VITE_URL_API}/admin/product`,
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

const changeOrder = (type, by, id) => {
  return (dispatch) => {
    try {
      return dispatch({ type: CHANGE_ORDER, payload: { type, by, id } });
    } catch (error) {
      console.log(error);
    }
  };
};

const deleteCategory = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${VITE_URL_API}/admin/category/${id}`);
      return dispatch({
        type: DELETE_CATEGORY,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const editCategory = (data) => {
  return async (dispatch) => {
    try {
      await axios.put();
    } catch (error) {
      console.log(error);
    }
  };
};

const obtainEditProduct = (producto) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: EDIT_PRODUCT_OBTENER,
        payload: producto,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const editProduct = (payload) => {
  console.log(payload);
  return async (dispatch) => {
    try {
      const update = await axios.put(`${VITE_URL_API}/admin/product`, payload);
      console.log(update);
      return dispatch({
        type: EDIT_PRODUCT,
        payload: update,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const viewProducts = (page, order, by) => {
  return (dispatch) => {
    try {
      return fetch(
        `${VITE_URL_API}/guess/product?page=${page}&order_direction=${order}&order_by=${by}&page_limit=${40}`
      )
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: GET_PRODUCTS, payload: json });
        });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS, payload: error });
    }
  };
};

const addToCart = (itemID) => {
  return {
    type: ADD_TO_CART,
    payload: {
      id: itemID,
    },
  };
};

const addToCartDetail = (itemID, qty) => {
  return {
    type: ADD_TO_CART_DETAIL,
    payload: {
      id: Number(itemID),
      qty: Number(qty),
    },
  };
};

const productQuantity = (itemID, qty) => {
  return {
    type: PRODUCT_QUANTITY,
    payload: {
      id: itemID,
      qty,
    },
  };
};

const removeProduct = (itemID) => {
  console.log(itemID);
  return {
    type: REMOVE_FROM_CART,
    payload: {
      id: itemID,
    },
  };
};

const resetCart = () => {
  return {
    type: RESET_CART,
  };
};

export {
  getProducts,
  productDetail,
  getProductsFilter,
  postReview,
  createCategory,
  getCategory,
  createProduct,
  changeOrder,
  getProduct,
  deleteCategory,
  editCategory,
  obtainEditProduct,
  editProduct,
  viewProducts,
  addToCart,
  productQuantity,
  removeProduct,
  addToCartDetail,
  resetCart,
};
