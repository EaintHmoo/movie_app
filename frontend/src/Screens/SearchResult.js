import Movie from "../Components/Movie";
import Titles from "../Components/Titles";
import { BsCollectionFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

function SearchResult() {
  const { searchedMovies: movies } = useSelector((state) => state.movies);
  return (
    <div className="py-6 min-height-screen container mx-auto">
      <Titles title="Searched Movies" Icon={BsCollectionFill} />
      <p className="py-6 text-lg font-medium">
        Total <span className="font-bold text-subMain">{movies?.length}</span>{" "}
        items Found
      </p>
      <div className="grid sm:mb-12 mb-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {movies?.map((movie, index) => (
          <Movie key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default SearchResult;
