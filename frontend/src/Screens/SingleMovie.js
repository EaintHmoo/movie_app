import React, { useState } from "react";
import { json, useLoaderData, useParams } from "react-router-dom";
import axios from "axios";
import { Movies } from "../Data/MovieData";
import MovieInfo from "../Components/Movie/MovieInfo";
import MovieCast from "../Components/Movie/MovieCast";
import MovieRate from "../Components/Movie/MovieRate";
import Movie from "../Components/Movie";
import Titles from "../Components/Titles";
import { BsCollectionFill } from "react-icons/bs";
import ShareMovieModal from "../Components/Modals/ShareMovieModal";
import { URL_PATH } from "../Helper/global";
function SingleMovie() {
  const movie = useLoaderData();
  // const { movieId, movieTitle } = useParams();
  // const movie = Movies.find((movie) => movie.name === movieTitle);
  const RelatedMovies = movie.related_movies;
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <ShareMovieModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        movie={movie}
      />
      <MovieInfo movie={movie} setModalOpen={setModalOpen} />
      <div className="container mx-auto px-2 my-6 min-height-screen">
        <MovieCast casts={movie.casts} />
        <MovieRate movie={movie} />
        <div className="my-16">
          <Titles title="Related Movies" Icon={BsCollectionFill} />
          <div className="grid mt-6 sm:mt-10 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6">
            {RelatedMovies.map((movie, index) => (
              <Movie movie={movie} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default SingleMovie;

export async function loader({ params }) {
  const movieId = params.movieId;
  return axios
    .get(`${URL_PATH}/movies/${movieId}`)
    .then(function (response) {
      console.log(response);
      return response.data.data;
    })
    .catch(function (error) {
      throw json({ message: error.message }, { status: error.response.status });
    });
}
