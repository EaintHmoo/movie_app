import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  const Links = [
    {
      title: "Company",
      links: [
        {
          name: "Home",
          link: "/",
        },
        {
          name: "About Us",
          link: "/about-us",
        },
        {
          name: "Contact Us",
          link: "/contact-us",
        },
        {
          name: "Movies",
          link: "/movies",
        },
      ],
    },
    {
      title: "Top Categories",
      links: [
        {
          name: "Action",
          link: "#",
        },
        {
          name: "Romantic",
          link: "#",
        },
        {
          name: "Drama",
          link: "#",
        },
        {
          name: "Historical",
          link: "#",
        },
      ],
    },
    {
      title: "My Account",
      links: [
        {
          name: "Dashboard",
          link: "/dashboard",
        },
        {
          name: "My Favorites",
          link: "/favorites",
        },
        {
          name: "Profile",
          link: "/profile",
        },
        {
          name: "Password Change",
          link: "/password",
        },
      ],
    },
  ];
  return (
    <div className="bg-dry border-t-1 border-black">
      <div className="containter py-4 px-2 mx-auto ">
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 justify-between">
          {Links.map((link, index) => (
            <div
              key={index}
              className="col-span-1 lg:col-span-3 md:col-span-2 pb-3.5 sm:pb-0"
            >
              <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 pb-0.5">
                {link.title}
              </h3>
              <ul className="text-sm flex flex-col space-y-3">
                {link.links.map((text, index) => (
                  <li
                    key={index}
                    className="hover:text-subMain w-full text-border inline-block "
                  >
                    <Link to={text.link}>{text.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-1 lg:col-span-3 md:col-span-2 pb-3.5 sm:pb-0">
            <Link to="/">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-2/4 object-contain h-12"
              ></img>
            </Link>
            <p className="leading-7 text-sm text-border mt-3">
              Lorem 196 Andrew Road, Suite 200,
              <br />
              New York, NY 10007
              <br />
              Tell: +255 754 661 423
              <br />
              Email: info@zpunet.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
