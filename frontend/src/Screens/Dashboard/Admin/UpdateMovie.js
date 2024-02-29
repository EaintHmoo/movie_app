import React, { useEffect, useState } from "react";
import { ImUpload } from "react-icons/im";
import SideBar from "../SideBar";
import { Input, Message, Select } from "../../../Components/UserInput";
import Uploader from "../../../Components/Uploader";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../Actions/categoryActions";
import { storeMovie, updateMovie } from "../../../Actions/movieActions";
import { useLocation, useNavigate } from "react-router-dom";
function UpdateMovie() {
  const location = useLocation();
  const dispatch = useDispatch();
  const nagivate = useNavigate();

  const movie = location.state;
  console.log(movie);
  const { categories } = useSelector((state) => state.categories);
  const { error, isUpdated, loading } = useSelector((state) => state.movie);
  const [inputData, setInputData] = useState({
    name: movie.name,
    description: movie.description,
    title_image: "",
    image: "",
    category: movie.category_id,
    language: movie.language,
    year: movie.year,
    time: movie.time,
    video: "",
  });
  const [preview, setPreview] = useState({
    image: "",
    title_image: "",
    video: "",
  });
  const clearInputData = () => {
    setInputData({
      name: "",
      description: "",
      title_image: "",
      image: "",
      category: categories.length > 0 ? categories[0].id : "",
      language: "",
      year: "",
      time: "",
      video: "",
    });
    setPreview({
      image: "",
      title_image: "",
      video: "",
    });
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onUploadChange = (name) => {
    return (acceptedFiles) => {
      setInputData((prev) => ({ ...prev, [name]: acceptedFiles[0] }));
      setPreview((prev) => ({
        ...prev,
        [name]: Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        }),
      }));
    };
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("name", inputData.name);
    myForm.append("description", inputData.description);
    myForm.append("title_image", inputData.title_image);
    myForm.append("image", inputData.image);
    myForm.append("category", inputData.category);
    myForm.append("language", inputData.language);
    myForm.append("year", inputData.year);
    myForm.append("time", inputData.time);
    myForm.append("video", inputData.video);
    dispatch(updateMovie(myForm, movie.id));
    clearInputData();
  };

  useEffect(() => {
    dispatch(getCategories());
    if (isUpdated) {
      nagivate(-1);
    }
  }, [dispatch, isUpdated]);
  return (
    <SideBar>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Update Movie</h2>
        <div className="grid md:grid-cols-2 w-full gap-6">
          <Input
            label="Movie Title"
            placeholder="Game of Thrones"
            type="text"
            bg={true}
            value={inputData.name}
            error={error?.name}
            name="name"
            onChange={onInputChange}
          />
          <Input
            label="Hours"
            placeholder="2hr"
            type="number"
            bg={true}
            value={inputData.time}
            error={error?.time}
            name="time"
            onChange={onInputChange}
          />
          <Input
            label="Language Used"
            placeholder="English"
            type="text"
            bg={true}
            value={inputData.language}
            error={error?.language}
            name="language"
            onChange={onInputChange}
          />
          <Input
            label="Year of Release"
            placeholder="2022"
            type="number"
            bg={true}
            value={inputData.year}
            error={error?.year}
            name="year"
            onChange={onInputChange}
          />
        </div>
        {/* Image */}
        <div className="grid md:grid-cols-2 w-full gap-6">
          {/* image without title */}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">
              Image without Title
            </p>
            <Uploader onUpload={onUploadChange("image")} />
            {error?.image && (
              <span className="text-subMain italic text-xs">
                {error?.image}
              </span>
            )}
            <div className="w-32 h-32 border border-border p-2 bg-dry rounded">
              {preview.image && (
                <img
                  src={
                    preview.image
                      ? URL.createObjectURL(preview.image)
                      : "/images/1.jpg"
                  }
                  className="w-full h-full object-cover rounded"
                ></img>
              )}
              {!preview.image && movie.image && (
                <img
                  src={movie.image || "/images/1.jpg"}
                  className="w-full h-full object-cover rounded"
                ></img>
              )}
            </div>
          </div>
          {/* image with title */}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">
              Image with Title
            </p>
            <Uploader onUpload={onUploadChange("title_image")} />
            {error?.title_image && (
              <span className="text-subMain italic text-xs">
                {error?.title_image}
              </span>
            )}
            <div className="w-32 h-32 border border-border p-2 bg-dry rounded">
              {preview.title_image && (
                <img
                  src={
                    preview.title_image
                      ? URL.createObjectURL(preview.title_image)
                      : "/images/2.jpeg"
                  }
                  className="w-full h-full object-cover rounded"
                ></img>
              )}
              {!preview.title_image && movie.title_image && (
                <img
                  src={movie.title_image || "/images/1.jpg"}
                  className="w-full h-full object-cover rounded"
                ></img>
              )}
            </div>
          </div>
        </div>
        <Message
          label="Movie Description"
          placeholder="Make it short and sweet"
          value={inputData.description}
          error={error?.description}
          name="description"
          onChange={onInputChange}
        />
        <div className="text-sm w-full">
          <Select
            label="Movie Category"
            options={categories.map((data) => {
              return {
                value: data.id,
                title: data.title,
              };
            })}
            value={inputData.category}
            error={error?.category}
            name="category"
            onChange={onInputChange}
          />
        </div>
        {/* movie video */}
        <div className="flex flex-col gap-2">
          <p className="text-border font-semibold text-sm">Movie Video</p>
          <Uploader onUpload={onUploadChange("video")} />
          {preview.video && (
            <span className="text-white text-sm">{preview.video.path}</span>
          )}
          {movie.video && (
            <a
              href={movie.video}
              target="_blank"
              className="text-white text-sm"
            >
              click
            </a>
          )}
        </div>

        <button
          type="submit"
          className="transitions text-white bg-subMain w-full flex-rows gap-4 py-4 rounded"
        >
          <ImUpload /> Publish Movie
        </button>
      </form>
    </SideBar>
  );
}
export default UpdateMovie;
