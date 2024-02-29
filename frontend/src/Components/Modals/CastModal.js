import React, { useEffect, useState } from "react";
import MainModal from "./MainModal";
import { Input } from "../UserInput";
import Uploader from "../Uploader";
function CastModal({ modalOpen, setModalOpen, cast, setCastList }) {
  const [inputData, setInputData] = useState({
    _id: "",
    name: "",
    image: null,
  });
  const [preview, setPreview] = useState();

  useEffect(() => {
    setInputData({
      _id: "",
      name: "",
      image: null,
    });
    setPreview();
  }, [modalOpen]);

  const castDataChange = (acceptedFiles) => {
    if (acceptedFiles) {
      setInputData((prev) => ({ ...prev, image: acceptedFiles[0] }));
      setPreview(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setModalOpen(false);
    if (cast) {
      setCastList((prev) =>
        prev.map((data) => {
          if (data._id === cast._id) {
            return {
              ...inputData,
              image: inputData.image || cast.image,
              _id: cast._id,
            };
          } else {
            return {
              ...data,
            };
          }
        })
      );
    } else {
      setCastList((prev) => [
        ...prev,
        {
          ...inputData,
          _id: Math.floor(Math.random() * 100) + "_" + Date.now(),
        },
      ]);
    }
  };
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 wfull align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">
          {cast ? "Update" : "Create"} Cast
        </h2>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-6 mt-6 text-left"
        >
          <Input
            label="Cast Name"
            placeholder={cast ? cast.name : "John Doe"}
            type="text"
            bg={false}
            value={inputData.name}
            onChange={(e) =>
              setInputData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          {/* cast image */}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">Cast Image</p>
            <Uploader onUpload={castDataChange} />
            <div className="w-32 h-32 border border-border p-2 bg-dry rounded">
              {cast && !preview && (
                <img
                  src={
                    cast?.image
                      ? URL.createObjectURL(cast.image)
                      : "/images/user.png"
                  }
                  className="w-full h-full object-cover rounded"
                ></img>
              )}
              {(!cast || preview) && (
                <img
                  src={
                    preview ? URL.createObjectURL(preview) : "/images/user.png"
                  }
                  onLoad={() => {
                    URL.revokeObjectURL(preview);
                  }}
                  className="w-full h-full object-cover rounded"
                ></img>
              )}
            </div>
          </div>
          <button
            onClick={() => setModalOpen(false)}
            className="w-full flex-rows transitions py-3 text-lg hover:bg-dry rounded bg-subMain text-white border border-subMain"
          >
            {cast ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </MainModal>
  );
}
export default CastModal;
