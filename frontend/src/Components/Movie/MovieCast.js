import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { Autoplay } from "swiper/modules";
import { UserData } from "../../Data/MovieData";
import { Swiper, SwiperSlide } from "swiper/react";
import Titles from "../Titles";
function MovieCast({ casts }) {
  return (
    <div className="my-12">
      <Titles title="Casts" Icon={FaUserFriends} />
      <div className="mt-10">
        <Swiper
          spaceBetween={10}
          loop={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          speed={1000}
          modules={[Autoplay]}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            400: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          className="mySwiper"
        >
          {casts.map((user, i) => (
            <SwiperSlide key={i}>
              <div className="w-full p-3 italic text-text rounded flex-colo bg-dry border border-gray-800">
                <img
                  src={user.image || "/images/user.png"}
                  alt={user.name}
                  className="w-full  h-64 rounded mb-4 object-cover"
                ></img>
                <p>{user?.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
export default MovieCast;
