import React from "react";
import { Link, useRouteError } from "react-router-dom";
import PageContent from "../Components/PageContent";
import { BiHomeAlt } from "react-icons/bi";
function NotFound() {
  const error = useRouteError();
  let title = "Error occured.";
  let message = "Something went wrong";
  if (error.status === 404) {
    title = "Page Not Found";
    message = "Could not find resource or page";
  } else {
    message = JSON.parse(error.data).message;
  }
  console.log(error);
  return (
    <div className="flex-colo w-full gap-8 min-h-screen text-white bg-main lg:py-20 py-10 px-6">
      <img
        className="w-fulll h-96 object-contain"
        src="/images/404.svg"
        alt="notfound"
      />
      <h1 className="font-bold text-white lg:text-4xl">{title}</h1>
      <p className="font-medium text-border italic leading-6">
        The page you are looking for does not exist. You may have mistyped the
        URL
      </p>
      <p>{message}</p>
      <Link
        to="/"
        className="rounded-md font-medium transitions text-white hover:text-main flex-rows gap-3 bg-subMain px-4 py-3"
      >
        <BiHomeAlt /> Back Home
      </Link>
    </div>
  );
}
export default NotFound;
