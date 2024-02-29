import React, { useEffect, useState } from "react";
import Filter from "../Components/Filter";
import { Movies } from "../Data/MovieData";
import Movie from "../Components/Movie";
import { CgSpinner } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../Actions/movieActions";
function MoviesPage() {
  const maxPage = 8;
  const [page, setPage] = useState(maxPage);
  const [filterValues, setFilterValues] = useState({});
  const { movies } = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);
  let filteredMovies = movies;
  filteredMovies = movies?.filter((movie) => {
    return (
      (filterValues.category
        ? movie.category === filterValues.category
        : true) &&
      (filterValues.year
        ? filterValues.year[0] < Number(movie.year) &&
          Number(movie.year) < filterValues.year[1]
        : true) &&
      (filterValues.times
        ? filterValues.times[0] < Number(movie.time) &&
          Number(movie.time) < filterValues.times[1]
        : true) &&
      (filterValues.rates
        ? Math.round(movie.rate) === Number(filterValues.rates)
        : true)
    );
  });
  const handlePageLoading = () => {
    setPage(page + maxPage);
  };
  const handleFilterData = (data) => {
    setFilterValues(data);
  };
  console.log(filteredMovies);
  return (
    <div className="py-6 min-height-screen container mx-auto">
      <Filter handleFilterData={handleFilterData} />
      <p className="py-6 text-lg font-medium">
        Total{" "}
        <span className="font-bold text-subMain">{filteredMovies?.length}</span>{" "}
        items Found
      </p>
      <div className="grid mt-6 sm:mt-10 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6">
        {filteredMovies?.slice(0, page)?.map((movie, index) => (
          <Movie movie={movie} key={index} />
        ))}
      </div>
      {filteredMovies?.length > maxPage && (
        <div className="w-full flex-colo md:my-20 my-10">
          <button
            onClick={handlePageLoading}
            className="flex-rows rounded border-2 border-subMain gap-3 font-semibold text-white px-8 py-3"
          >
            Load More <CgSpinner className="animate-spin" />
          </button>
        </div>
      )}
    </div>
  );
}
export default MoviesPage;
