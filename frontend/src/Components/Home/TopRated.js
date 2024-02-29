import React, { useState } from "react";
import {
  BsBookmarkStarFill,
  BsCaretLeftFill,
  BsCaretRightFill,
} from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import Titles from "../Titles";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Movies } from "../../Data/MovieData";
import RatedStar from "../RatedStar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOrRemoveFavouriteMovie } from "../../Actions/movieActions";

function TopRated({ movies }) {
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);
  const navigationClass =
    "bg-subMain hover:bg-dry transitions text-white w-10 h-10 rounded-lg flex-colo";

  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const { success, error, loading } = useSelector((state) => state.movies);
  const onAddOrRemoveFavourite = (id) => {
    dispatch(addOrRemoveFavouriteMovie(token, id));
  };
  return (
    <div className="my-16">
      <Titles title="Top Rated" Icon={BsBookmarkStarFill} />
      <div className="mt-10">
        <Swiper
          navigation={{ nextEl, prevEl }}
          loop={true}
          modules={[Navigation]}
          className="mySwiper"
          speed={1000}
          slidesPerView={4}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={index}>
              <div className="relative hovered border border-border w-full h-rate p-4 rounded-lg bg-dry">
                <img
                  src={movie.title_image || "/images/user.png"}
                  alt={movie.name}
                  className="w-full h-full object-cover rounded-lg"
                ></img>
                <div className="bg-black hoverers px-4 bg-opacity-70 transitions absolute top-0 bottom-0 left-0 right-0 text-center gap-6">
                  <button
                    onClick={() =>
                      token
                        ? onAddOrRemoveFavourite(movie.id)
                        : nagivate("/login")
                    }
                    className="w-12 h-12 bg-white bg-opacity-30 flex-colo tranisitons rounded-full hover:bg-subMain"
                  >
                    <FaHeart />
                  </button>
                  <Link
                    to={`/movie/${movie.name}`}
                    className="text-xl text-white line-clamp-2 font-sans font-semibold trancuted"
                  >
                    {movie.name}
                  </Link>
                  <RatedStar value={movie.rate} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex-rows gap-4 w-full pt-12">
          <button className={navigationClass} ref={(node) => setPrevEl(node)}>
            <BsCaretLeftFill />
          </button>
          <button className={navigationClass} ref={(node) => setNextEl(node)}>
            <BsCaretRightFill />
          </button>
        </div>
      </div>
    </div>
  );
}
export default TopRated;
