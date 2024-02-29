import {
  ALL_CATEGORY_FAIL,
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,
  NEW_CATEGORY_RESET,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_RESET,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_RESET,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../Constants/categoryConstants";

import axios from "axios";

import { URL_PATH } from "../Helper/global";

// Get All Categories
export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORY_REQUEST });

    let link = `${URL_PATH}/categories`;

    const { data } = await axios.get(link);
    dispatch({
      type: ALL_CATEGORY_SUCCESS,
      payload: { categories: data.data },
    });
  } catch (error) {
    dispatch({
      type: ALL_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

//store category data
export const storeCategory = (title) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CATEGORY_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${URL_PATH}/categories`,
      { title },
      config
    );
    dispatch({
      type: NEW_CATEGORY_SUCCESS,
      payload: { category: data.data },
    });
  } catch (error) {
    dispatch({
      type: NEW_CATEGORY_FAIL,
      payload: error.response.data.errors,
    });
  }
};

//update category data
export const updateCategory = (id, title) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `${URL_PATH}/categories/${id}`,
      { title },
      config
    );
    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload: error.response.data.errors,
    });
  }
};

//delete category data
export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.delete(`${URL_PATH}/categories/${id}`, config);
    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: error.response.data.errors,
    });
  }
};

//reset delete
export const resetDelete = () => async (dispatch) => {
  dispatch({ type: DELETE_CATEGORY_RESET });
};

//reset update
export const resetUpdate = () => async (dispatch) => {
  dispatch({ type: UPDATE_CATEGORY_RESET });
};

//reset new
export const resetNew = () => async (dispatch) => {
  dispatch({ type: NEW_CATEGORY_RESET });
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
