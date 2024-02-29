import React, { useEffect, useState } from "react";
import Table from "../../../Components/Table";
import SideBar from "../SideBar";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateCount,
  deleteMovie,
  getMovies,
  resetDelete,
} from "../../../Actions/movieActions";
import { checkAdmin } from "../../../Helper/helper";
import DeleteModal from "../../../Components/Modals/DeleteModal";
import Alert from "../../../Components/Alert";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const { user, token } = useSelector((state) => state.user);
  const isAdmin = user?.roles ? checkAdmin(user.roles) : false;
  const { movies } = useSelector((state) => state.movies);
  const { moviesCount, categoriesCount, usersCount } = useSelector(
    (state) => state.count
  );

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
    if (!token) {
      nagivate("/login");
    }
    if (!isAdmin) {
      nagivate("/");
    }

    if (deleteModalOpen === false) {
      setMovie();
    }
    dispatch(calculateCount());
    dispatch(getMovies());
  }, [deleteModalOpen, dispatch, isDeleted, isUpdated]);
  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Movies",
      total: moviesCount || 0,
    },
    {
      bg: "bg-blue-700",
      icon: HiViewGrid,
      title: "Total Categories",
      total: categoriesCount || 0,
    },
    {
      bg: "bg-green-600",
      icon: FaUser,
      title: "Total Users",
      total: usersCount || 0,
    },
  ];
  return (
    <SideBar>
      <DeleteModal
        modalOpen={deleteModalOpen}
        setModalOpen={setDeleteModalOpen}
        onConfirm={onDeleteConfirm}
      />

      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {DashboardData.map((data, index) => (
          <div
            className="p-4 rounded bg-main border-border grid grid-cols-4 gap-2"
            key={index}
          >
            <div
              className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}
            >
              <data.icon />
            </div>
            <div className="col-spas-3">
              <h2>{data.title}</h2>
              <p className="font-bold mt-2">{data.total}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-md font-medium my-6 text-border">Recent Movies</h3>
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
        data={movies?.slice(0, 5) || []}
        admin={isAdmin}
        onDelete={onDeleteMovie}
      />
    </SideBar>
  );
}
export default Dashboard;
