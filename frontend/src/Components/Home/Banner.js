import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Movies } from "../../Data/MovieData";
import FlexMovie from "../FlexMovie";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrRemoveFavouriteMovie,
  getMovies,
} from "../../Actions/movieActions";

function Banner() {
  const { movies } = useSelector((state) => state.movies);
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const nagivate = useNavigate();

  const onAddOrRemoveFavourite = (id) => {
    dispatch(addOrRemoveFavouriteMovie(token, id));
  };

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);
  return (
    <div className="relative w-full">
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        direction="vertical"
        loop={true}
        speed={1000}
        modules={[Autoplay]}
        className="w-full xl:h-96 bg-dry lg:h-64 h-48"
      >
        {movies?.slice(0, 6).map((movie, index) => (
          <SwiperSlide key={index} className="relative rounded overflow-hidden">
            <img
              src={movie?.image || "/images/user.png"}
              alt={movie.name}
              className="w-full h-full object-cover"
            ></img>
            <div className="absolute top-0 liner-bg xl:pl-52 sm:pl-32 pl-8 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">
              <h1 className="xl:text-4xl font-bold truncate capitalize font-sans sm:text-2xl text-xl">
                {movie.name}
              </h1>
              <div className="flex items-center text-dryGray gap-5">
                <FlexMovie movie={movie} />
              </div>
              <div className="flex items-center gap-5">
                <Link
                  to={`/movies/${movie.id}/${movie.name}`}
                  className="hover:text-main text-white font-medium bg-subMain rounded transitions px-8 py-3 sm:text-sm text-xs"
                >
                  Watch
                </Link>
                <button
                  onClick={() =>
                    token
                      ? onAddOrRemoveFavourite(movie.id)
                      : nagivate("/login")
                  }
                  className="hover:text-subMain text-white font-medium bg-white bg-opacity-30 rounded transitions px-4 py-3 sm:text-sm text-xs"
                >
                  <FaHeart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export default Banner;
