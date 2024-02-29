import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import { Input } from "../../Components/UserInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearErrors,
  logout,
  resetUpdatePassword,
  updatePassword,
} from "../../Actions/userActions";
function Password() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);

  const {
    error: userError,
    loading,
    isUpdated,
    message,
  } = useSelector((state) => state.userActions);
  const [input, setInput] = useState({
    prePassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    prePassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "prePassword":
          if (!value) {
            stateObj[name] = "Please enter Pre Password.";
          }
          break;

        case "newPassword":
          if (!value) {
            stateObj[name] = "Please enter New Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "New Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.newPassword && value !== input.newPassword) {
            stateObj[name] =
              "New Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (Object.values(error).every((x) => x === null || x === "")) {
      dispatch(updatePassword(token, input.prePassword, input.newPassword));
      setInput({
        prePassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  useEffect(() => {
    if (!userError) {
      dispatch(clearErrors());
    }
    if (isUpdated) {
      dispatch(resetUpdatePassword());
      dispatch(logout(token));
    }

    if (!token) {
      navigate("/login");
    }
  }, [dispatch, navigate, userError, isUpdated, token]);

  return (
    <SideBar>
      <form onSubmit={formSubmit} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Change Password</h2>
        <Input
          label="Previous Password"
          placeholder="********"
          type="password"
          bg={true}
          name="prePassword"
          onChange={onInputChange}
          onBlur={validateInput}
          error={
            error.prePassword ? error.prePassword : userError?.prePassword || ""
          }
          value={input.prePassword}
        />
        <Input
          label="New Password"
          placeholder="********"
          type="password"
          bg={true}
          name="newPassword"
          onChange={onInputChange}
          onBlur={validateInput}
          error={
            error.newPassword ? error.newPassword : userError?.newPassword || ""
          }
          value={input.newPassword}
        />
        <Input
          label="Confirm Password"
          placeholder="********"
          type="password"
          bg={true}
          name="confirmPassword"
          onChange={onInputChange}
          onBlur={validateInput}
          error={error.confirmPassword}
          value={input.confirmPassword}
        />
        <div className="flex sm:flex-row justify-end items-center my-4">
          <button
            type="submit"
            className="bg-main transitions text-white border border-subMain hover:bg-subMain sm:w-auto w-full py-4 px-6 rounded"
          >
            Change Password
          </button>
        </div>
      </form>
    </SideBar>
  );
}
export default Password;
