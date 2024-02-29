import React from "react";
import { json, useLoaderData } from "react-router-dom";
import Banner from "../Components/Home/Banner";
import PopularMovies from "../Components/Home/PopularMovies";
import Promos from "../Components/Home/Promos";
import TopRated from "../Components/Home/TopRated";
import axios from "axios";
import { URL_PATH } from "../Helper/global";
function HomeScreen() {
  const movies = useLoaderData();
  return (
    <div className="container mx-auto min-h-screen px-2 mb-6">
      <Banner />
      <PopularMovies movies={movies} />
      <Promos />
      <TopRated movies={movies} />
    </div>
  );
}
export default HomeScreen;

export async function loader() {
  return axios
    .get(`${URL_PATH}/movies/random`)
    .then(function (response) {
      return response.data.data;
    })
    .catch(function (error) {
      throw json({ message: error.error.message }, { status: error.status });
    });
}
