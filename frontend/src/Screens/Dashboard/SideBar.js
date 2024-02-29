import React from "react";
import { BsFillGridFill } from "react-icons/bs";
import { RiMovie2Fill, RiLockPasswordLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { HiViewGridAdd } from "react-icons/hi";
import { FaListAlt, FaUsers, FaHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkAdmin } from "../../Helper/helper";
function SideBar({ children }) {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const isAdmin = user?.roles ? checkAdmin(user.roles) : false;
  const SideLinks = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: BsFillGridFill,
      isShow: isAdmin,
    },
    {
      name: "Movies List",
      link: "/movieslist",
      icon: FaListAlt,
      isShow: true,
    },
    {
      name: "Add Movie",
      link: "/addmovie",
      icon: RiMovie2Fill,
      isShow: isAdmin,
    },
    {
      name: "Categories",
      link: "/categories",
      icon: HiViewGridAdd,
      isShow: isAdmin,
    },
    {
      name: "Users",
      link: "/users",
      icon: FaUsers,
      isShow: isAdmin,
    },
    {
      name: "Update Profile",
      link: "/profile",
      icon: FiSettings,
      isShow: true,
    },
    {
      name: "Favorites Movies",
      link: "/favorites",
      icon: FaHeart,
      isShow: true,
    },
    {
      name: "Change Password",
      link: "/password",
      icon: RiLockPasswordLine,
      isShow: true,
    },
  ];
  const active = "bg-dryGray text-subMain";
  const hover = "hover:text-white hover:bg-main";
  const inActive =
    "rounded font-medium text-sm transitions flex gap-3 items-center p-4";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;
  return (
    <div className=" min-h-screen container mx-auto px-2">
      <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
        <div className="col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5">
          {
            //SideBar Links
            SideLinks.map(
              (link, index) =>
                link.isShow && (
                  <NavLink to={link.link} key={index} className={Hover}>
                    <link.icon /> <p>{link.name}</p>
                  </NavLink>
                )
            )
          }
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="10"
          data-ao-offset="200"
          className="col-span-6 bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
export default SideBar;
