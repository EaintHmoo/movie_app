import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ImUpload } from "react-icons/im";
import SideBar from "../SideBar";
import Alert from "../../../Components/Alert";
import { Input, Message, Select } from "../../../Components/UserInput";
import Uploader from "../../../Components/Uploader";
import { CategoriesData } from "../../../Data/CategoriesData";
import { UserData } from "../../../Data/MovieData";
import CastModal from "../../../Components/Modals/CastModal";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../Actions/categoryActions";
import { storeMovie } from "../../../Actions/movieActions";
function AddMovie() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { error, success, loading } = useSelector((state) => state.newMovie);
  const [modalOpen, setModalOpen] = useState(false);
  const [cast, setCast] = useState();
  const [castList, setCastList] = useState([]);
  const [inputData, setInputData] = useState({
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
  const [preview, setPreview] = useState({
    image: "",
    title_image: "",
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
    setCastList([]);
  };
  const onEditCast = (id) => {
    setCast(id);
    setModalOpen(!modalOpen);
  };
  const onDeleteCast = (id) => {
    setCastList((prev) => prev.filter((data) => data._id !== id._id));
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
    castList.forEach((castData, index) => {
      Object.entries(castData).forEach(([key, value]) => {
        myForm.append(`casts[${index}][${key}]`, value);
      });
    });
    dispatch(storeMovie(myForm));
    clearInputData();
  };

  useEffect(() => {
    dispatch(getCategories());
    clearInputData();
  }, [dispatch]);
  useEffect(() => {
    if (modalOpen === false) {
      setCast();
    }
  }, [cast, modalOpen, castList, success, error]);
  return (
    <SideBar>
      {success && (
        <div className="w-full md:w-3/5 2xl:w02/5">
          <Alert
            message={success}
            color="red"
            onClick={() => {
              dispatch({ type: "NEW_MOVIE_RESET" });
            }}
          />
        </div>
      )}
      <CastModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        cast={cast}
        setCastList={setCastList}
      />
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Create Movie</h2>
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
              <img
                src={
                  preview.image
                    ? URL.createObjectURL(preview.image)
                    : "/images/1.jpg"
                }
                className="w-full h-full object-cover rounded"
              ></img>
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
              <img
                src={
                  preview.title_image
                    ? URL.createObjectURL(preview.title_image)
                    : "/images/2.jpeg"
                }
                className="w-full h-full object-cover rounded"
              ></img>
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
          {inputData.video && (
            <span className="text-white text-sm">{inputData.video.path}</span>
          )}
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="w-full">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="w-full rounded text-white flex-colo bg-main border border-dotted py-4 border-subMain"
            >
              Add Cast
            </button>
          </div>
          <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4">
            {castList.map((user, i) => (
              <div
                key={i}
                className="flex-colo gap-3 border border-border rounded p-2 italic text-xs text-text bg-main"
              >
                <img
                  src={
                    user?.image
                      ? URL.createObjectURL(user.image)
                      : "/images/user.png"
                  }
                  alt={user?.name}
                  className="h-24 w-full object-cover mb-2"
                ></img>
                <p className="font-semibold">{user?.name}</p>
                <div className="flex-rows gap-2 mt-2 w-full ">
                  <button
                    type="button"
                    onClick={() => onDeleteCast(user)}
                    className="border flex-colo border-border rounded w-6 h-6"
                  >
                    <MdDelete className="text-subMain" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onEditCast(user)}
                    className="border flex-colo border-border rounded w-6 h-6"
                  >
                    <FaEdit className="text-green-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
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
export default AddMovie;
