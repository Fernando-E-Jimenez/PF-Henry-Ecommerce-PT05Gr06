import {
  GET_STATES,
  GET_ORDER,
  NEW_STATE,
  EDIT_STATE,
  DELETE_STATE,
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
  REMOVE_FROM_FAVORITE,
  GET_ALL_PAYMENTS,
  RESET_FAVORITE,
  
} from "../types";

const initialState = {
  products: [],
  productEdit: null,
  detail: {},
  resultPost: {},
  categories: [],
  states: [],
  order: {
    type: "",
    by: "",
    id: "",
  },
  /* cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [], */
  cart: [],
  favorite: [],
  orders: [],
  profile: {},
  roles: {},
  purchases: {},
};

//console.log(initialState.productEdit);

const reducer = (state = initialState, action) => {
  // console.log(state)
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


    case GET_ALL_PAYMENTS: {
      return {
        ...state,
      };
    }

    case GET_ORDER: {
      return {
        ...state,
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
      const inCart =
        state.cart.length > 0 ?
          state.cart.find((product) =>
            product.id === action.payload.id ? true : false
          )
          : false;

      return {
        ...state,
        cart: inCart
          ? state.cart.map((product) =>
            product.id === action.payload.id
              ? { ...product, car: { cant: product.car.cant + 1 } }
              : product
          )
          : [...state.cart, { ...product, car: { cant: 1 } }],
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
              ? { ...product, car: { cant: product.car.cant + 1 } }
              : product
          )
          : [...state.cart, { ...product, car: { cant: action.payload.qty } }],
      };
    }

    case PRODUCT_QUANTITY: {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, car: { cant: action.payload.qty } }
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

    case GET_STATES: {
      return {
        ...state,
        states: action.payload
      }
    }

    case ORDERS_SHOW: {
      return {
        ...state,
        orders: action.payload,
      }
    }

    case DISABLE_PRODUCT: {
      return {
        ...state,
      }
    }

    case CHANGE_CART_USER: {
      return {
        ...state,
        cart: action.payload,
      }
    }

    case ADD_TO_FAVORITE_USER: {
      return {
        ...state,
        favorite: action.payload,
      }
    }

    case FAVORITE_SHOW: {
      return {
        ...state,
        favorite: typeof (action.payload) == 'string' ? [] : action.payload,
      }
    }

    case REMOVE_FROM_FAVORITE: {
      return {
        ...state,
        favorite: state.favorite.filter((product) => product.id !== action.payload.id),
      };
    }

    case RESET_FAVORITE: {
      return {
        ...state,
        favorite: [],
      };
    }

    case CHANGE_PROFILE: {
      return {
        ...state,
        profile: action.payload,
      }
    }

    case CART_SHOW: {
      return {
        ...state,
        cart: typeof (action.payload) == 'string' ? [] : action.payload,
      }
    }

    case VIEW_ROLES: {
      return {
        ...state,
        roles: action.payload,
      }
    }

    case CHANGE_USER: {
      return {
        ...state,
        resultPost: action.payload
      }
    }

    case CONFIRM_PURCHASE: {
      return {
        ...state,
        resultPost: action.payload
      }
    }

    case SHOW_PURCHASES: {
      return {
        ...state,
        purchases: action.payload
      }
    }

    default:
      return state;
  }
};

export default reducer;
