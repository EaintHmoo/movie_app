import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { BsCollectionPlay } from "react-icons/bs";
import { FiHeart, FiUserCheck, FiLogOut } from "react-icons/fi";
import { CgMenuBoxed } from "react-icons/cg";
import MenuDrawer from "../../Components/Drawer/MenuDrawer";
import { SidebarContext } from "../../Context/SiderbarContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Actions/userActions";
function MobileFooter() {
  const dispatch = useDispatch();
  const { mobileDrawer, toggleDrawer } = useContext(SidebarContext);
  const active = "bg-white text-main";
  const inActive =
    "transitions text-2xl flex-colo hover:text-main text-white rounded-md px-4 py-3";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : inActive;

  const { favouriteCount } = useSelector((state) => state.movies);
  const { loading, token, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const logoutHandler = () => {
    dispatch(logout(token));
  };
  return (
    <>
      <div className="flex-btn h-full bg-white rounded cursor-pointer overflow-y-scroll flex-grow w-full">
        <MenuDrawer drawerOpen={mobileDrawer} toggleDrawer={toggleDrawer} />
        <footer className="lg:hidden fixed z-50 bottom-0 w-full px-1">
          <div className="bg-dry rounded-md flex-btn w-full p-1">
            <NavLink to="/movies" className={Hover}>
              <BsCollectionPlay />
            </NavLink>
            <NavLink to="/favorites" className={Hover}>
              <div className="relative">
                <FiHeart />
                <div className="absolute -top-5 -right-1 bg-subMain text-white text-xs rounded-full w-5 h-5 flex-colo">
                  {favouriteCount}
                </div>
              </div>
            </NavLink>
            {!isAuthenticated && (
              <NavLink to="/login" className={Hover}>
                <FiUserCheck />
              </NavLink>
            )}
            {isAuthenticated && (
              <button onClick={logoutHandler} className={inActive}>
                <FiLogOut />
              </button>
            )}
            <button className={inActive}>
              <CgMenuBoxed />
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}
export default MobileFooter;
