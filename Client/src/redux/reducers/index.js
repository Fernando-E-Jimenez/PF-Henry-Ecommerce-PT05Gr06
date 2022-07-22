import {
  GET_PRODUCTS,
  PRODUCT_DETAIL,
  GET_PRODUCTS_FILTER,
  POST_REVIEW,
  NEW_CATEGORY,
  GET_CATEGORIES,
  CHANGE_ORDER,
  NEW_PRODUCT,
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

const initialState = {
  products: [],
  productEdit: null,
  detail: {},
  resultPost: {},
  categories: [],
  order: {
    type: "",
    by: "",
    id: "",
  },
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

//console.log(initialState.productEdit);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }

    case PRODUCT_DETAIL: {
      return {
        ...state,
        detail: action.payload,
      };
    }

    case CHANGE_ORDER: {
      return {
        ...state,
        order: {
          type: action.payload.type,
          by: action.payload.by,
          id: action.payload.id,
        },
      };
    }

    case GET_PRODUCTS_FILTER: {
      return {
        ...state,
        products: action.payload,
      };
    }

    case POST_REVIEW: {
      return {
        ...state,
        resultPost: action.payload,
      };
    }
    case GET_CATEGORIES:
    case NEW_CATEGORY: {
      return {
        ...state,
        categories: action.payload,
      };
    }

    case NEW_PRODUCT: {
      return {
        ...state,
        detail: action.payload,
      };
    }

    case GET_PRODUCT: {
      return {
        ...state,
        products: action.payload,
      };
    }

    case DELETE_CATEGORY: {
      return {
        ...state,
      };
    }

    case EDIT_CATEGORY: {
      let editCategory = state.categories.map((cat) =>
        cat.id === action.payload.id ? action.payload : cat
      );
      return {
        ...state,
        categories: editCategory,
      };
    }

    case EDIT_PRODUCT_OBTENER: {
      return {
        ...state,
        productEdit: action.payload,
      };
    }

    case EDIT_PRODUCT: {
      return {
        ...state,
        productEdit: null,
        products: action.payload,
      };
    }

    case ADD_TO_CART: {
      const product = state.products.data.find(
        (product) => product.id === action.payload.id
      );
      const inCart = state.cart.find((product) =>
        product.id === action.payload.id ? true : false
      );

      return {
        ...state,
        cart: inCart
          ? state.cart.map((product) =>
              product.id === action.payload.id
                ? { ...product, qty: product.qty + 1 }
                : product
            )
          : [...state.cart, { ...product, qty: 1 }],
      };
    }

    case ADD_TO_CART_DETAIL: {
      const product = { ...state.detail, id: action.payload.id };
      const inCart = state.cart.find((product) =>
        product.id === action.payload.id ? true : false
      );

      return {
        ...state,
        cart: inCart
          ? state.cart.map((product) =>
              product.id === action.payload.id
                ? { ...product, qty: product.qty + 1 }
                : product
            )
          : [...state.cart, { ...product, qty: action.payload.qty }],
      };
    }

    case PRODUCT_QUANTITY: {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };
    }

    case REMOVE_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== action.payload.id),
      };
    }

    case RESET_CART: {
      return {
        ...state,
        cart: [],
      };
    }

    default:
      return state;
  }
};

export default reducer;
