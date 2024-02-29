import React, { useEffect, useState } from "react";
import Table from "../../../Components/Table";
import SideBar from "../SideBar";
import { useDispatch, useSelector } from "react-redux";
import { checkAdmin } from "../../../Helper/helper";
import {
  deleteMovie,
  getMovies,
  resetDelete,
} from "../../../Actions/movieActions";
import DeleteModal from "../../../Components/Modals/DeleteModal";
import Alert from "../../../Components/Alert";
function MovieList() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const isAdmin = user?.roles ? checkAdmin(user.roles) : false;
  const { movies } = useSelector((state) => state.movies);
  const { isDeleted, isUpdated } = useSelector((state) => state.movie);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [movie, setMovie] = useState();

  const onDeleteMovie = (id) => {
    setMovie(id);
    setDeleteModalOpen(!deleteModalOpen);
  };

  const onDeleteConfirm = () => {
    dispatch(resetDelete());
    dispatch(deleteMovie(movie?.id));
    setDeleteModalOpen(!deleteModalOpen);
  };

  useEffect(() => {
    if (deleteModalOpen === false) {
      setMovie();
    }
    dispatch(getMovies());
  }, [deleteModalOpen, dispatch, isDeleted, isUpdated]);

  return (
    <SideBar>
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
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-3">
          <h2 className="text-xl font-bold">Movies List</h2>
          <button className="bg-main transitions text-white border border-subMain hover:bg-subMain w-full sm:w-auto py-4 px-4 rounded">
            Delete All
          </button>
        </div>
        <Table data={movies || []} admin={isAdmin} onDelete={onDeleteMovie} />
      </div>
    </SideBar>
  );
}
export default MovieList;
