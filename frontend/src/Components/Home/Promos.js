import React from "react";
import { FiUser } from "react-icons/fi";
function Promos() {
  return (
    <div className="px-8 lg:px-20 py-10 bg-dry">
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-6 items-center">
        <div className="flex flex-col lg:gap-10 gap-6">
          <h1 className="lg:text-3xl text-xl capitalize font-bold lg:leading-loose text-white">
            Download Your Movies Watch Offline.
            <br />
            Enjoy On Your Mobile
          </h1>
          <p className="text-text text-sm xl:text-base leading-6 xl:leading-8">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries..
          </p>
          <div className="flex gap-4 md:text-lg text-sm">
            <div className="bg-main py-3 flex flex-colo px-6 rounded text-subMain font-bold text-xl">
              HD 4K
            </div>
            <div className="bg-main py-3 flex flex-rows px-6 rounded text-subMain font-bold text-xl gap-4">
              <FiUser /> 2K
            </div>
          </div>
        </div>
        <img src="/images/mobile.png" className="w-full object-cover"></img>
      </div>
    </div>
  );
}
export default Promos;
