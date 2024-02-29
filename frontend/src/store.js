import { configureStore } from "@reduxjs/toolkit";

import {
  userReducer,
  usersReducer,
  userActionsReducer,
} from "./Reducers/userReducers";
import {
  moviesReducer,
  newMovieReducer,
  movieReducer,
  movieDetailsReducer,
  countReducer,
} from "./Reducers/movieReducers";

import {
  categoriesReducer,
  newCategoryReducer,
  categoryReducer,
  categoryDetailsReducer,
} from "./Reducers/categoryReducers";

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    userActions: userActionsReducer,
    movies: moviesReducer,
    newMovie: newMovieReducer,
    movie: movieReducer,
    movieDetails: movieDetailsReducer,
    count: countReducer,
    categories: categoriesReducer,
    newCategory: newCategoryReducer,
    category: categoryReducer,
    categoryDetails: categoryDetailsReducer,
  },
});

export default store;
