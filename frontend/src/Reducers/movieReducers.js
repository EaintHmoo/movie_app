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
  ALL_COUNT_TOTAL,
  ADD_MOVIE_COUNT,
  ADD_CATEGORY_COUNT,
  ADD_USER_COUNT,
  COUNT_REQUEST,
  COUNT_REQUEST_FAIL,
  FAVOURITE_MOVIE_REQUEST,
  FAVOURITE_MOVIE_SUCCESS,
  FAVOURITE_MOVIE_FAIL,
  ADD_OR_REMOVE_FAVOURITE_REQUEST,
  ADD_OR_REMOVE_FAVOURITE_SUCCESS,
  ADD_OR_REMOVE_FAVOURITE_FAIL,
  CLEAR_MESSAGE,
  SEARCH_MOVIE_REQUEST,
  SEARCH_MOVIE_SUCCESS,
  SEARCH_MOVIE_FAIL,
} from "../Constants/movieConstants";

const moviesInitial = {
  movies: [],
  favouriteCount: localStorage.getItem("favouriteCount")
    ? localStorage.getItem("favouriteCount")
    : 0,
};
export const moviesReducer = (state = moviesInitial, action) => {
  switch (action.type) {
    case SEARCH_MOVIE_REQUEST:
    case ADD_OR_REMOVE_FAVOURITE_REQUEST:
    case FAVOURITE_MOVIE_REQUEST:
    case ALL_MOVIE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FAVOURITE_MOVIE_SUCCESS:
      return {
        ...state,
        loading: false,
        favouriteMovies: action.payload.movies,
      };
    case SEARCH_MOVIE_SUCCESS:
      return {
        ...state,
        loading: false,
        searchedMovies: action.payload,
      };
    case ADD_OR_REMOVE_FAVOURITE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.message,
        favouriteCount: action.payload.count,
      };

    case ALL_MOVIE_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload.movies,
      };
    case SEARCH_MOVIE_FAIL:
    case ADD_OR_REMOVE_FAVOURITE_FAIL:
    case FAVOURITE_MOVIE_FAIL:
    case ALL_MOVIE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case CLEAR_MESSAGE:
      return {
        ...state,
        success: null,
      };
    default:
      return state;
  }
};

export const newMovieReducer = (state = { movie: {} }, action) => {
  switch (action.type) {
    case NEW_MOVIE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_MOVIE_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        movie: action.payload.movie,
      };
    case NEW_MOVIE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_MOVIE_RESET:
      return {
        ...state,
        success: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const movieReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_MOVIE_REQUEST:
    case UPDATE_MOVIE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_MOVIE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_MOVIE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_MOVIE_FAIL:
    case UPDATE_MOVIE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_MOVIE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_MOVIE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const movieDetailsReducer = (state = { movie: {} }, action) => {
  switch (action.type) {
    case MOVIE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case MOVIE_DETAILS_SUCCESS:
      return {
        loading: false,
        movie: action.payload,
      };
    case MOVIE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const countReducer = (state = {}, action) => {
  switch (action.type) {
    case COUNT_REQUEST:
      return {
        loading: false,
      };
    case ALL_COUNT_TOTAL:
      return {
        loading: true,
        moviesCount: action.payload.moviesCount,
        categoriesCount: action.payload.categoriesCount,
        usersCount: action.payload.usersCount,
      };
    case ADD_MOVIE_COUNT:
      return {
        ...state,
        loading: true,
        moviesCount: state.moviesCount + 1,
      };
    case ADD_CATEGORY_COUNT:
      return {
        ...state,
        loading: true,
        categoriesCount: state.categoriesCount + 1,
      };
    case ADD_USER_COUNT:
      return {
        ...state,
        loading: true,
        usersCount: state.usersCount + 1,
      };
    case COUNT_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
