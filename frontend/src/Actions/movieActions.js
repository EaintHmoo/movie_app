import {
  ALL_MOVIE_FAIL,
  ALL_MOVIE_REQUEST,
  ALL_MOVIE_SUCCESS,
  NEW_MOVIE_REQUEST,
  NEW_MOVIE_SUCCESS,
  NEW_MOVIE_FAIL,
  NEW_MOVIE_RESET,
  UPDATE_MOVIE_REQUEST,
  UPDATE_MOVIE_SUCCESS,
  UPDATE_MOVIE_FAIL,
  UPDATE_MOVIE_RESET,
  DELETE_MOVIE_REQUEST,
  DELETE_MOVIE_SUCCESS,
  DELETE_MOVIE_FAIL,
  DELETE_MOVIE_RESET,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_FAIL,
  MOVIE_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  COUNT_REQUEST,
  ALL_COUNT_TOTAL,
  COUNT_REQUEST_FAIL,
  FAVOURITE_MOVIE_REQUEST,
  FAVOURITE_MOVIE_FAIL,
  FAVOURITE_MOVIE_SUCCESS,
  ADD_OR_REMOVE_FAVOURITE_REQUEST,
  ADD_OR_REMOVE_FAVOURITE_SUCCESS,
  ADD_OR_REMOVE_FAVOURITE_FAIL,
  SEARCH_MOVIE_REQUEST,
  SEARCH_MOVIE_SUCCESS,
  SEARCH_MOVIE_FAIL,
} from "../Constants/movieConstants";

import axios from "axios";

import { URL_PATH } from "../Helper/global";

// Get All Movies
export const getMovies = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_MOVIE_REQUEST });

    let link = `${URL_PATH}/movies`;

    const { data } = await axios.get(link);
    dispatch({
      type: ALL_MOVIE_SUCCESS,
      payload: { movies: data.data, moviesCount: data.data.length },
    });
  } catch (error) {
    dispatch({
      type: ALL_MOVIE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//  Movie show
export const getMovie = (id) => async (dispatch) => {
  try {
    dispatch({ type: MOVIE_DETAILS_REQUEST });

    let link = `${URL_PATH}/movies/${id}`;

    const { data } = await axios.get(link);
    dispatch({
      type: MOVIE_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: MOVIE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Movies
export const getSearchedMovies =
  (key = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: SEARCH_MOVIE_REQUEST });

      let link = `${URL_PATH}/movies`;

      if (key) {
        link = `${URL_PATH}/movies?key=${key}`;
      }

      const { data } = await axios.get(link);
      dispatch({
        type: SEARCH_MOVIE_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_MOVIE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get favourite Movies
export const getFavouriteMovies = (token) => async (dispatch) => {
  try {
    dispatch({ type: FAVOURITE_MOVIE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    let link = `${URL_PATH}/movies/favourite-movies`;

    const { data } = await axios.get(link, config);
    dispatch({
      type: FAVOURITE_MOVIE_SUCCESS,
      payload: { movies: data.data },
    });
  } catch (error) {
    dispatch({
      type: FAVOURITE_MOVIE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// add or remove favourite Movies
export const addOrRemoveFavouriteMovie =
  (token, movie_id) => async (dispatch) => {
    try {
      dispatch({ type: ADD_OR_REMOVE_FAVOURITE_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      let link = `${URL_PATH}/favourite-movies/addorremove`;

      const { data } = await axios.put(link, { movie_id }, config);
      localStorage.setItem("favouriteCount", data.count);
      dispatch({
        type: ADD_OR_REMOVE_FAVOURITE_SUCCESS,
        payload: { message: data.message, count: data.count },
      });
    } catch (error) {
      dispatch({
        type: ADD_OR_REMOVE_FAVOURITE_FAIL,
        payload: error.response.data.errors,
      });
    }
  };

//store movie data
export const storeMovie = (movieData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_MOVIE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(`${URL_PATH}/movies`, movieData, config);
    dispatch({
      type: NEW_MOVIE_SUCCESS,
      payload: { movie: data.data, message: data.message },
    });
  } catch (error) {
    dispatch({
      type: NEW_MOVIE_FAIL,
      payload: error.response.data.errors,
    });
  }
};

//update movie data
export const updateMovie = (movieData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_MOVIE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    movieData.append("_method", "PUT");

    const { data } = await axios.post(
      `${URL_PATH}/movies/${id}`,
      movieData,
      config
    );
    dispatch({
      type: UPDATE_MOVIE_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_MOVIE_FAIL,
      payload: error.response.data.errors,
    });
  }
};

//delete movie data
export const deleteMovie = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_MOVIE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.delete(`${URL_PATH}/movies/${id}`, config);
    dispatch({
      type: DELETE_MOVIE_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_MOVIE_FAIL,
      payload: error.response.data.errors,
    });
  }
};

export const calculateCount = () => async (dispatch) => {
  try {
    dispatch({ type: COUNT_REQUEST });

    let link = `${URL_PATH}/calculate-count`;

    const { data } = await axios.get(link);
    dispatch({
      type: ALL_COUNT_TOTAL,
      payload: {
        moviesCount: data.movies_count,
        categoriesCount: data.categories_count,
        usersCount: data.users_count,
      },
    });
  } catch (error) {
    dispatch({
      type: COUNT_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

//reset new
export const resetNew = () => async (dispatch) => {
  dispatch({ type: NEW_MOVIE_RESET });
};

//reset delete
export const resetDelete = () => async (dispatch) => {
  dispatch({ type: DELETE_MOVIE_RESET });
};

//reset update
export const resetUpdate = () => async (dispatch) => {
  dispatch({ type: UPDATE_MOVIE_RESET });
};
