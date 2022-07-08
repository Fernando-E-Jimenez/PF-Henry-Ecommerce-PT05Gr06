import { GET_PRODUCTS, PRODUCT_DETAIL, GET_PRODUCTS_FILTER } from "../types";

const initialState = {
  products: [],
  detail: {},
};

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

    case GET_PRODUCTS_FILTER: {
      return {
        ...state,
        products: action.payload
      }
    }

    default:
      return state;
  }
};

export default reducer;
