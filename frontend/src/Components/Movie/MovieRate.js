import React, { useEffect, useState } from "react";
import axios from "axios";
import Titles from "../Titles";
import { BsBookmarkStarFill } from "react-icons/bs";
import { Message, Select } from "../UserInput";
import RatedStar from "../../Components/RatedStar";
import { URL_PATH } from "../../Helper/global";
function MovieRate({ movie }) {
  const Ratings = [
    {
      title: "0 - Poor",
      value: 0,
    },
    {
      title: "1 - Fair",
      value: 1,
    },
    {
      title: "2 - Good",
      value: 2,
    },
    {
      title: "3 - Very Good",
      value: 3,
    },
    {
      title: "4 - Excellent",
      value: 4,
    },
    {
      title: "5 - Masterpiece",
      value: 5,
    },
  ];
  const [rating, setRating] = useState();
  const [reviews, setReviews] = useState(movie.reviews);
  const [formData, setFormData] = useState({
    rate: "0",
    message: "",
    movieId: movie?.id,
    userId: 1,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setReviews(movie.reviews);
    setFormData({ rate: "0", message: "", movieId: movie?.id, userId: 1 });
  }, [movie]);
  const validateForm = () => {
    const newErrors = {};
    if (!formData.rate.trim()) {
      newErrors.rate = "Rate is required";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear validation error for the field being edited
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const isValid = validateForm();

    if (isValid) {
      // Form submission logic goes here
      try {
        // Submit the form data to the backend
        const response = await submitFormData(formData);

        // Handle successful response from the backend
        // Clear any previous validation errors
        setErrors({});

        setReviews(response.reviews);
      } catch (error) {
        // Handle errors returned from the backend
        if (error.response && error.response.data) {
          setErrors(JSON.parse(error.response.data.errors));
        }
      }
    }
  };

  return (
    <div className="my-12">
      <Titles title="Reviews" Icon={BsBookmarkStarFill} />
      <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs-p-10 py-10 px-2 sm:p-10 rounded">
        {/* Write Reviews */}
        <form
          onSubmit={handleSubmit}
          className="xl:col-span-2 w-full flex flex-col gap-8"
        >
          <h3 className="text-xl text-text font-semibold">
            Review "{movie?.name}"
          </h3>
          <p className="text-sm leading-7 font-medium text-border">
            Write a review for this movie. It will be posted on this page. lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Donec
          </p>
          <div className="text-sm w-full">
            <Select
              label="Select Rating"
              options={Ratings}
              name="rate"
              onChange={(e) => {
                setRating(e.target.value);
                handleChange(e);
              }}
              value={formData.rate}
              error={errors.rate || ""}
            ></Select>
            <div className="flex mt-4 text-lg gap-2 text-star">
              <RatedStar value={rating} />
            </div>
          </div>
          {/* message */}
          <Message
            name="message"
            value={formData.message}
            onChange={handleChange}
            error={errors.message}
            label="Message"
            placeholder="Make it short and sweet..."
          />
          {/* submit */}
          <button className="bg-subMain text-white py-3 w-full felx-colo rounded">
            Submit
          </button>
        </form>
        {/* Reviewers */}
        <div className="col-span-3 w-full flex flex-col gap-6">
          <h3 className="text-xl text-text font-semibold">
            Reviews ({reviews?.length})
          </h3>
          <div className="w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header overflow-y-scroll">
            {reviews.map((review, i) => (
              <div className="border border-gray-800 rounded-lg bg-dry p-4 md:grid flex flex-col w-full grid-cols-12 gap-6 ">
                <div className="col-span-2 bg-main hidden md:block">
                  <img
                    src={
                      review?.user_image
                        ? review.user_image
                        : "/images/ninja.png"
                    }
                    alt={review?.user_name}
                    className="w-full h-24 rounded-lg object-cover"
                  />
                </div>
                <div className="col-span-7 flex flex-col gap-2">
                  <h2>{review?.user_name}</h2>
                  <p className="text-xs leading-6 font-medium text-text">
                    {review?.message}
                  </p>
                </div>
                {/* rating */}
                <div className="col-span-3 flex-rows border-l border-border text-xs gap-1 text-star">
                  <RatedStar value={review?.rate} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MovieRate;

// Dummy function to simulate form submission to the backend
const submitFormData = async (data) => {
  // Simulating backend response delay
  return axios
    .post(`${URL_PATH}/reviews`, {
      user_id: data.userId,
      movie_id: data.movieId,
      rate: data.rate,
      message: data.message,
    })
    .then(function (response) {
      console.log(response);
      return response.data;
    });
};
