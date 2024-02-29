import React from "react";
import MainDrawer from "./MainDrawer";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
function MenuDrawer({ drawerOpen, toggleDrawer }) {
  return (
    <MainDrawer drawerOpen={drawerOpen} closeDrawer={toggleDrawer}>
      <div className="flex flex-col w-full h-full justify-between items-center bg-main text-white rounded">
        <div className="w-full flex-btn h-16 px-6 py-4 bg-dry">
          <Link to="/" onClick={toggleDrawer}>
            <img src="/images/logo.png" className="w-28 h-28 object-contain" />
          </Link>
          <button
            onClick={toggleDrawer}
            type="button"
            className="w-12 h-12 flex-colo text-base text-subMain rounded-full bg-white hover:bg-subMain hover:text-white transitions"
          >
            <IoMdClose />
          </button>
        </div>
      </div>
    </MainDrawer>
  );
}
export default MenuDrawer;
