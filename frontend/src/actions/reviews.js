import * as api from "../api";
import {
  COMMENT,
  FETCH_REVIEW,
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
} from "../constants/actionTypes";

export const getReview = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchReview(id)

    dispatch({ type: FETCH_REVIEW, payload: data })
    dispatch({ type: END_LOADING })
  } catch (err) {
    console.log(err)
  }
};

export const getReviews = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchReviews(page)

    dispatch({ type: FETCH_ALL, payload: data })
    dispatch({ type: END_LOADING })
  } catch (err) {
    console.log(err)
  }
};

export const getMyReviews = (_id) => async (dispatch) => {
  try {
    console.log("inside actions getMyReviews")
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchMyReviews(_id)

    dispatch({ type: FETCH_ALL, payload: data })
    dispatch({ type: END_LOADING })
  } catch (err) {
    console.log(err)
  }
};

export const getReviewBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const {
      data: { data },
    } = await api.fetchReviewsBySearch(searchQuery)

    dispatch({ type: FETCH_BY_SEARCH, payload: data })
    dispatch({ type: END_LOADING })
  } catch (err) {
    console.log(err)
  }
};

export const createReview = (review, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.createReview(review)
    dispatch({ type: END_LOADING })
    history.push(`/reviews/${data._id}`)
    dispatch({ type: CREATE, payload: data })
  } catch (err) {
    console.log(err.message)
  }
};

export const updateReview = (id, review) => async (dispatch) => {
  try {
    const { data } = await api.updateReview(id, review)
    dispatch({ type: UPDATE, payload: data })
  } catch (err) {
    console.log(err)
  }
};

export const deleteReview = (id) => async (dispatch) => {
  try {
    await api.deleteReview(id)
    dispatch({ type: DELETE, payload: id })
  } catch (err) {
    console.log(err)
  }
};

export const likeReview = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeReview(id)
    dispatch({ type: UPDATE, payload: data })
  } catch (err) {
    console.log(err)
  }
};

export const commentReview = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id)
    dispatch({ type: COMMENT, payload: data })
    return data.comments
  } catch (err) {
    console.log(err)
  }
};
