import React from "react";
function Head({ title }) {
  return (
    <div className="w-full bg-deepGray lg:h-64 h-40 relative overflow-hidden rounded">
      <img src="/images/head.png" className="w-full h-full object-cover"></img>
      <div className="absolute lg:top-24 top-16 w-full flex-colo">
        <h1 className=" lg:text-h1 font-bold text-xl text-white">
          {title && title}
        </h1>
      </div>
    </div>
  );
}
export default Head;
