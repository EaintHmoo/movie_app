import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Movies } from "../Data/MovieData";
import { BiArrowBack } from "react-icons/bi";
import { FaCloudDownloadAlt, FaHeart, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addOrRemoveFavouriteMovie, getMovie } from "../Actions/movieActions";
function WatchPage() {
  const { movieId } = useParams();
  const { token } = useSelector((state) => state.user);
  const { movie } = useSelector((state) => state.movieDetails);
  const [play, setPlay] = useState(false);
  const dispatch = useDispatch();
  const nagivate = useNavigate();

  const onAddOrRemoveFavourite = (id) => {
    dispatch(addOrRemoveFavouriteMovie(token, id));
  };

  useEffect(() => {
    console.log(movie);
    dispatch(getMovie(movieId));
  }, [dispatch]);
  return (
    <div className="container mx-auto bg-dry p-6 mb-12">
      <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6">
        <Link
          to={`/movies/${movie?.id}/${movie?.name}`}
          className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray"
        >
          <BiArrowBack /> {movie?.name}
        </Link>
        <div className="flex-btn sm:w-auto w-full gap-5">
          <button
            onClick={() =>
              token ? onAddOrRemoveFavourite(movie.id) : nagivate("/login")
            }
            className="bg-white hover:text-subMain rounded px-4 py-3 text-dryGray bg-opacity-30 text-sm"
          >
            <FaHeart />
          </button>
          <button className="bg-subMain flex-rows gap-2 hover:text-main rounded px-8 py-3 text-dryGray transitions font-medium text-sm">
            <FaCloudDownloadAlt /> Download
          </button>
        </div>
      </div>
      {/* watch video */}
      {play ? (
        <video controls autoPlay={play} className="w-full h-full rounded">
          <source
            src="/images/the_lovers.mp4"
            title={movie?.name}
            type="video/mp4"
          ></source>
        </video>
      ) : (
        <div className="w-full h-screen rounded-lg overflow-hidden relative">
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
            <button
              onClick={() => setPlay(true)}
              className="bg-white text-subMain flex-colo border border-subMain rounded-full font-medium text-xl w-20 h-20"
            >
              <FaPlay />
            </button>
          </div>
          <img
            src={movie?.image ? movie.image : "/images/user.png"}
            alt={movie?.name}
            className="w-full h-full object-cover rounded-lg"
          ></img>
        </div>
      )}
    </div>
  );
}
export default WatchPage;
