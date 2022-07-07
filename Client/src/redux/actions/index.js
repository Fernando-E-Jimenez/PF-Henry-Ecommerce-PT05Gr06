import { products } from "../../../../dbPrueba";
import { GET_PRODUCTS, PRODUCT_DETAIL } from "../types";

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
  return async (dispatch) => {
    try {
      const product = products.filter((p) => p.id == id);
      return dispatch({
        type: PRODUCT_DETAIL,
        payload: product,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export { getProducts, productDetail };
