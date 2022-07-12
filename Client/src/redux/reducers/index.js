import {
  GET_PRODUCTS,
  PRODUCT_DETAIL,
  GET_PRODUCTS_FILTER,
  POST_REVIEW,
  NEW_CATEGORY,
  GET_CATEGORIES,
} from "../types";

const initialState = {
  products: [],
  detail: {},
  resultPost: {},
  categories: [],
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
      }
    }

    default:
      return state;
  }
};

export default reducer;
