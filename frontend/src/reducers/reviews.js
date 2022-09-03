import {
  COMMENT,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  UPDATE,
  CREATE,
  DELETE,
  START_LOADING,
  END_LOADING,
  FETCH_REVIEW,
} from "../constants/actionTypes";

export default (state = { isLoading: true, reviews: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        reviews: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return { ...state, reviews: action.payload };
    case FETCH_REVIEW:
      return { ...state, review: action.payload };
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case COMMENT:
      return {
        ...state,
        reviews: state.reviews.map((review) =>
          review._id === action.payload._id ? action.payload : review
        ),
      };
    case CREATE:
      return { ...state, reviews: [...state.reviews, action.payload] };
    case UPDATE:
      return {
        ...state,
        reviews: state.reviews.map((review) =>
          review._id === action.payload._id ? action.payload : review
        ),
      };
    case DELETE:
      return {
        ...state,
        reviews: state.reviews.filter((review) => review._id !== action.payload),
      };
    default:
      return state;
  }
};
