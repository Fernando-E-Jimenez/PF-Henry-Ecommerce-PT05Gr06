import { products } from "../../../dbPrueba";
import {
  GET_STATES,
  GET_ORDER,
  GET_ALL_PAYMENTS,
  NEW_STATE,
  EDIT_STATE,
  DELETE_STATE,
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
  ORDERS_SHOW,
  DISABLE_PRODUCT,
  CHANGE_CART_USER,
  CHANGE_PROFILE,
  CART_SHOW,
  VIEW_ROLES,
  CHANGE_USER,
  CONFIRM_PURCHASE,
  SHOW_PURCHASES,
  FAVORITE_SHOW,
  ADD_TO_FAVORITE,
  ADD_TO_FAVORITE_USER,
  RESET_FAVORITE,
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
  return async (dispatch) => {
    try {
      const update = await axios.put(`${VITE_URL_API}/admin/product`, payload);
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
        `${VITE_URL_API}/admin/product?page=${page}&order_direction=${order}&order_by=${by}&page_limit=${40}`
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

const getStates = () => {
  return async (dispatch) => {
    try {
      const states = await axios.get(`${VITE_URL_API}/admin/state`);
      return dispatch({
        type: GET_STATES,
        payload: states.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};


const deleteState = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${VITE_URL_API}/admin/state/${id}`);
      return dispatch({
        type: DELETE_STATE,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const editState = (data) => {
  return async (dispatch) => {
    try {
      const update = await axios.put(`${VITE_URL_API}/admin/state/${id}`);
      return dispatch({
        type: EDIT_STATE,
        payload: update,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const createState = (payload) => {
  return async (dispatch) => {
    try {
      const state = await axios.post(
        `${VITE_URL_API}/admin/state`,
        payload
      );
      console.log(state);
      return dispatch({
        type: NEW_STATE,
        payload: category,

      });
    } catch (error) {
      console.log(error);
    }
  };
};

const ordersShow = () => {
  return async (dispatch) => {
    try {
      return fetch(
        `${VITE_URL_API}/admin/order`
      )
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: ORDERS_SHOW, payload: json });
        });
    } catch (error) {
      dispatch({ type: ORDERS_SHOW, payload: error });
    }
  };
}

const confirmPayment = () => {
  return async (dispatch) => {
    try {
      return fetch(
        `${VITE_URL_API}/mercadopago/pagos`
      )
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: GET_ALL_PAYMENTS, payload: json });
        });
    } catch (error) {
      dispatch({ type: GET_ALL_PAYMENTS, payload: error });
    }
  };
}
const getOrder = (idorder) => {
  return (dispatch) => {
    try {
      return fetch(
        `${VITE_URL_API}/mercadopago/${idorder}`
      )
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: GET_ORDER, payload: json });
        });
    } catch (error) {
      dispatch({ type: GET_ORDER, payload: error });
    }
  };
};

const disableProduct = (idProduct) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${VITE_URL_API}/admin/product/${idProduct}`);
      return dispatch({
        type: DISABLE_PRODUCT,
        });
    } catch (error) {
      console.log(error);
    }
  };
}

const addToCartUser = (user, id) => {
  return async(dispatch) => {
    try {
      const data = {
        id,
        cant: 1,
      }
      const update = await axios.post(`${VITE_URL_API}/user/${user}/car`,data);
      return dispatch({
        type: CHANGE_CART_USER,
        payload: update.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

const addToCartDetailUser = (user, id, cant) => {
  return async(dispatch) => {
    try {
      const data = {
        id,
        cant,
      }
      const update = await axios.post(`${VITE_URL_API}/user/${user}/car`,data);
      return dispatch({
        type: CHANGE_CART_USER,
        payload: update.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

const removeProductUser = (user, id) => {
  return async(dispatch) => {
    try {
      const data = {
        data: {
          id
        }
      }
      console.log(data)
      const update = await axios.delete(`${VITE_URL_API}/user/${user}/car`,data);
      return dispatch({
        type: CHANGE_CART_USER,
        payload: update.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

const resetCartUser = (user) => {
  return async(dispatch) => {
    try {
      await axios.delete(`${VITE_URL_API}/user/${user}/car/reset`);
      return dispatch({
        type: RESET_CART,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

const cartShow = (user) => {
  return async(dispatch) => {
    try {
      const cart = await axios.get(`${VITE_URL_API}/user/${user}/car`);
      return dispatch({
        type: CART_SHOW,
        payload: cart.data,
      });
    } catch (error) {
      dispatch({ type: CART_SHOW, payload: 'Error' });
    }
  };
}

const changeProfile = (data) => {
  return async(dispatch) => {
    try {
      const user = await axios.post(`${VITE_URL_API}/admin/user/validateuser`, data);
      return dispatch({
        type: CHANGE_PROFILE,
        payload: user.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

const viewRoles = () => {
  return async(dispatch) => {
    try {
      const roles = await axios.get(`${VITE_URL_API}/admin/user`);
      return dispatch({
        type: VIEW_ROLES,
        payload: roles.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

const deleteUser = (user) => {
  return async(dispatch) => {
    try {
      const changeUser = await axios.delete(`${VITE_URL_API}/admin/user/${user}`);
      return dispatch({
        type: CHANGE_USER,
        payload: changeUser,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

const changeRolUser = (user) => {
  return async(dispatch) => {
    try {
      const changeUser = await axios.put(`${VITE_URL_API}/admin/user/${user}/rol`);
      return dispatch({
        type: CHANGE_USER,
        payload: changeUser,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

const corfirmPurchase = (user, data) => {
  return async(dispatch) => {
    try {
      const order = await axios.post(`${VITE_URL_API}/user/${user}/order`, data);
      // console.log("Actions: "+order.data.id)
      return dispatch({
        type: CONFIRM_PURCHASE,
        payload: order.data.id,
        });
    } catch (error) {
      console.log(error);
    }
  };
}

const addToFavoriteUser = (user, id) => {
  return async(dispatch) => {
    try {
      const data = {
        id,
      }
      const update = await axios.post(`${VITE_URL_API}/user/${user}/favorite`,data);
      return dispatch({
        type: ADD_TO_FAVORITE_USER,
        payload: update.data,
       });
    } catch (error) {
      console.log(error);
    }
  };
}

const showPurchases = (user) => {
  return async(dispatch) => {
    try {
      const purchase = await axios.get(`${VITE_URL_API}/user/${user}/order`);
      return dispatch({
        type: SHOW_PURCHASES,
        payload: purchase.data,
         });
    } catch (error) {
      console.log(error);
    }
  };
}

const addToFavorite = (itemID) => {
  return {
    type: ADD_TO_FAVORITE,
    payload: {
      id: itemID,
    },
  };
};

const removeFromFavoriteUser = (user, id) => {
  return async(dispatch) => {
    try {
      const data = {
        data: {
          id
        }
      }
      console.log(data)
      const update = await axios.delete(`${VITE_URL_API}/user/${user}/favorite`,data);
      return dispatch({
        type: ADD_TO_FAVORITE_USER,
        payload: update.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

const changeOrderStatus = (idOrder, id) => {
  return async(dispatch) => {
    try {
      const data = {
        state: id
      }
      if(id == 6) {
        const stock = await axios.post(`${VITE_URL_API}/admin/order/${idOrder}/removestock`);
        console.log(stock);
      }
      const changeStatus = await axios.put(`${VITE_URL_API}/admin/order/${idOrder}`, data);
      return dispatch({
        type: ORDERS_SHOW,
        payload: changeStatus,
      });
    } catch (error) {
      console.log(error);
     }
  };
}

const favoriteShow = (user) => {
  return async(dispatch) => {
    try {
      const cart = await axios.get(`${VITE_URL_API}/user/${user}/favorite`);
      return dispatch({
        type: FAVORITE_SHOW,
        payload: cart.data,
      });
    } catch (error) {
      dispatch({ type: FAVORITE_SHOW, payload: 'Error' });
    }
  };
}

const resetFavorite = (user) => {
  return async(dispatch) => {
    try {
      await axios.delete(`${VITE_URL_API}/user/${user}/favorite/reset`);
      return dispatch({
        type: RESET_FAVORITE,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const filterOrderStatus = (id) => {
  return async(dispatch) => {
    try {
      const filterStatus = await axios.get(`${VITE_URL_API}/admin/order?state=${id}`);
      return dispatch({
        type: ORDERS_SHOW,
        payload: filterStatus.data,
      });
    } catch (error) {
      console.log(error);
     }
  };
}

const viewRolesFilter = (user) => {
  return async(dispatch) => {
    try {
      const roles = await axios.get(`${VITE_URL_API}/admin/user?user=${user}`);
      return dispatch({
        type: VIEW_ROLES,
        payload: roles.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

const filterOrderName = (user) => {
  return async(dispatch) => {
    try {
      const filterStatus = await axios.get(`${VITE_URL_API}/admin/order?user=${user}`);
      return dispatch({
        type: ORDERS_SHOW,
        payload: filterStatus.data,
      });
    } catch (error) {
      console.log(error);
     }
  };
}

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
  getStates,
  createState,
  editState,
  deleteState,
  ordersShow,
  disableProduct,
  addToCartUser,
  changeProfile,
  addToCartDetailUser,
  cartShow,
  removeProductUser,
  resetCartUser,
  viewRoles,
  deleteUser,
  changeRolUser,
  corfirmPurchase,
  showPurchases,
  changeOrderStatus,
  addToFavoriteUser,
  addToFavorite,
  getOrder,
  favoriteShow,
  removeFromFavoriteUser,
  confirmPayment,
  filterOrderStatus,
  resetFavorite,
  viewRolesFilter,
  filterOrderName,
};
