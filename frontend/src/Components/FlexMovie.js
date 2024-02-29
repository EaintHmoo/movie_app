import React from "react";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";

function FlexMovie({ movie }) {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{movie.category}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaRegCalendarAlt className="w-3 h-3 text-subMain" />
        <span className="text-sm font-medium">{movie.year}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaRegClock className="w-3 h-3 text-subMain" />
        <span className="text-sm font-medium">{movie.time} hr</span>
      </div>
    </>
  );
}
export default FlexMovie;
