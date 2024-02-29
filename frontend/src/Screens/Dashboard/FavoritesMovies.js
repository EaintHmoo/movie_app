import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Table from "../../Components/Table";
import { Movies } from "../../Data/MovieData";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMovie,
  getFavouriteMovies,
  resetDelete,
} from "../../Actions/movieActions";
import { checkAdmin } from "../../Helper/helper";
import Alert from "../../Components/Alert";
import DeleteModal from "../../Components/Modals/DeleteModal";
import { useNavigate } from "react-router-dom";

function FavoritesMovies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favouriteMovies } = useSelector((state) => state.movies);
  const { user, token } = useSelector((state) => state.user);
  const { isDeleted, isUpdated } = useSelector((state) => state.movie);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [movie, setMovie] = useState();
  const isAdmin = user?.roles ? checkAdmin(user.roles) : false;
  console.log(favouriteMovies, token);
  useEffect(() => {
    if (token) {
      dispatch(getFavouriteMovies(token));
    } else {
      navigate("/login");
    }
  }, [dispatch, token]);

  const onDeleteMovie = (id) => {
    setMovie(id);
    setDeleteModalOpen(!deleteModalOpen);
  };

  const onDeleteConfirm = () => {
    dispatch(resetDelete());
    dispatch(deleteMovie(movie?.id));
    setDeleteModalOpen(!deleteModalOpen);
  };
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-3">
          <h2 className="text-xl font-bold">Favorites Movies</h2>
          <button className="bg-main transitions text-white border border-subMain hover:bg-subMain w-full sm:w-auto py-4 px-4 rounded">
            Delete All
          </button>
        </div>
        <DeleteModal
          modalOpen={deleteModalOpen}
          setModalOpen={setDeleteModalOpen}
          onConfirm={onDeleteConfirm}
        />
        {(isDeleted || isUpdated) && (
          <div className="w-full">
            <Alert
              message={isDeleted || isUpdated}
              color="red"
              onClick={() => {
                isDeleted
                  ? dispatch({ type: "DELETE_MOVIE_RESET" })
                  : dispatch({ type: "UPDATE_MOVIE_RESET" });
              }}
            />
          </div>
        )}
        <Table
          data={favouriteMovies || []}
          admin={isAdmin}
          onDelete={onDeleteMovie}
        />
      </div>
    </SideBar>
  );
}
export default FavoritesMovies;
