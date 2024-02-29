import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHeart, FaSearch } from "react-icons/fa";
import { CgUser, CgLogOut } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Actions/userActions";
import { getSearchedMovies } from "../../Actions/movieActions";
function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, token, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const { favouriteCount } = useSelector((state) => state.movies);
  const hover = "hover:text-subMain text-white transitions";
  const Hover = ({ isActive }) => (isActive ? "text-subMain" : hover);

  const [searchKey, setSearchKey] = useState();

  const logoutHandler = () => {
    dispatch(logout(token));
  };

  const onSearchHandler = (e) => {
    e.preventDefault();
    dispatch(getSearchedMovies(searchKey));
    navigate("/search-results");
  };
  return (
    <>
      <div className="bg-main shadow-md sticky top-0 z-20">
        <div className="container mx-auto py-12 px-2 lg:grid grid-cols-7 gap-10 justify-between items-center">
          <div className="col-span-1 lg:block hidden">
            <Link to="/">
              <img
                src="/images/logo.png"
                className="w-full h-12 object-contain"
              ></img>
            </Link>
          </div>
          <form
            onSubmit={onSearchHandler}
            className="col-span-3 w-full bg-dryGray text-sm flex-btn gap-4 rounded"
          >
            <button
              type="submit"
              className="bg-subMain text-white flex-colo rounded w-12 h-12"
            >
              <FaSearch />
            </button>
            <input
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              type="text"
              placeholder="Search Movie Name from here"
              className="text-black placeholder:text-border font-medium px-2 border-none bg-transparent rounded text-sm w-11/12 h-12"
            ></input>
          </form>
          <div className="col-span-3 hidden w-full lg:flex xl:gap-14 2xl:gap-20 xl:justify-end justify-between items-center">
            <NavLink to="/movies" className={Hover}>
              Movies
            </NavLink>
            <NavLink to="/about-us" className={Hover}>
              About Us
            </NavLink>
            <NavLink to="/contact-us" className={Hover}>
              Contact Us
            </NavLink>
            {!isAuthenticated && (
              <NavLink to="/login" className={Hover}>
                <CgUser className="w-8 h-8" />
              </NavLink>
            )}

            {isAuthenticated && (
              <button onClick={logoutHandler} className={hover}>
                <CgLogOut className="w-8 h-8" />
              </button>
            )}

            <NavLink to="/favorites" className={`${Hover} relative`}>
              <FaHeart className="w-6 h-6" />
              <div className="absolute -top-5 -right-1 bg-subMain text-white text-xs rounded-full w-5 h-5 flex-colo">
                {favouriteCount}
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navigation;
