import React, { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addOrRemoveFavouriteMovie } from "../Actions/movieActions";

function Movie({ movie }) {
  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const { success, error, loading } = useSelector((state) => state.movies);
  const onAddOrRemoveFavourite = (id) => {
    dispatch(addOrRemoveFavouriteMovie(token, id));
  };
  return (
    <div className="border border-border rounded p-1 relative hover:scale-95 transitions overflow-hidden">
      <Link to={`/movies/${movie.id}/${movie.name}`}>
        <img
          src={movie.image || "/images/user.png"}
          className="w-full h-64 object-cover"
        ></img>
      </Link>
      <div className="absolute bottom-0 left-0 right-0 w-full flex-btn gap-2 px-4 py-3 bg-main bg-opacity-60 text-white">
        <span className=" trancate font-semibold">{movie.name}</span>
        <button
          onClick={() =>
            token ? onAddOrRemoveFavourite(movie.id) : nagivate("/login")
          }
          className="bg-subMain rounded-md text-sm h-9 w-9 flex-colo text-white hover:bg-transparent hover:border-2 hover:border-subMain"
        >
          <FaHeart />
        </button>
      </div>
    </div>
  );
}
export default Movie;
