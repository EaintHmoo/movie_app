import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { Input } from "../../Components/UserInput";
import Uploader from "../../Components/Uploader";
import {
  deleteAccount,
  resetAccountDelete,
  resetUpdateProfile,
  updateProfile,
} from "../../Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../Components/Alert";
import { IMG_PATH } from "../../Helper/global";
import { useNavigate } from "react-router-dom";
function Profile() {
  const {
    message: deletedMsg,
    token,
    user,
    isDeleted,
  } = useSelector((state) => state.user);
  const { message, loading, errors, isUpdated } = useSelector(
    (state) => state.userActions
  );
  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState();

  const onDeleteAccount = () => {
    dispatch(deleteAccount(token));
  };

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("image", avatar);
    dispatch(updateProfile(token, myForm));
  };

  useEffect(() => {
    if (!token) {
      nagivate("/login");
    }
    if (isDeleted) {
      dispatch(resetAccountDelete());
    }

    if (isUpdated) {
      dispatch(resetUpdateProfile());
    }
  }, [dispatch, nagivate, isDeleted, isUpdated]);

  const updateProfileDataChange = (acceptedFiles) => {
    if (acceptedFiles) {
      setAvatar(acceptedFiles[0]);
      setAvatarPreview(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    }
  };
  return (
    <SideBar>
      {(message || deletedMsg) && (
        <div className="w-full">
          <Alert
            message={message || deletedMsg}
            color="red"
            onClick={() => {
              dispatch({ type: "CLEAR_MESSAGE" });
            }}
          />
        </div>
      )}
      <form onSubmit={updateProfileSubmit} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <Uploader onUpload={updateProfileDataChange} />
        {errors?.image && (
          <span className="text-subMain italic text-xs">{errors?.image}</span>
        )}
        <div className="w-32 h-32 border border-border p-2 bg-dry rounded">
          <img
            src={
              avatarPreview
                ? URL.createObjectURL(avatarPreview)
                : "/images/user.png"
            }
            onLoad={() => {
              URL.revokeObjectURL(avatarPreview);
            }}
            className="w-full h-full object-cover rounded"
          ></img>
        </div>
        <Input
          label="FullName"
          placeholder="Your name"
          type="text"
          bg={true}
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors?.name}
        />
        <Input
          label="Email"
          placeholder="example@gmail.com"
          type="email"
          bg={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors?.email}
        />
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button
            onClick={onDeleteAccount}
            type="button"
            className="bg-subMain transitions text-white border border-subMain hover:bg-main sm:w-auto w-full py-4 px-6 rounded"
          >
            Delete Account
          </button>
          <button
            type="submit"
            className="bg-main transitions text-white border border-subMain hover:bg-subMain sm:w-auto w-full py-4 px-6 rounded"
          >
            Update Profile
          </button>
        </div>
      </form>
    </SideBar>
  );
}
export default Profile;
