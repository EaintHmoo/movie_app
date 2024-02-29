import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./Reducers/userReducers";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  moviesReducer,
  newMovieReducer,
  movieReducer,
  movieDetailsReducer,
} from "./Reducers/movieReducers";

const reducer = combineReducers({
  user: userReducer,
  movies: moviesReducer,
  newMovie: newMovieReducer,
  movie: movieReducer,
  movieDetails: movieDetailsReducer,
});

let initialState = {};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
