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
  },
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
        productEdit: action.payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
