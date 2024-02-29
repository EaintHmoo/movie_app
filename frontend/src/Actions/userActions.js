import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  ALL_USER_FAIL,
  ALL_USER_REQUEST,
  CLEAR_ERRORS,
  ALL_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  UPDATE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_RESET,
  UPDATE_USER_RESET,
  APPROVE_USER_REQUEST,
  APPROVE_USER_SUCCESS,
  APPROVE_USER_FAIL,
  APPROVE_USER_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_USER,
  ACCOUNT_DELETE_SUCCESS,
  ACCOUNT_DELETE_REQUEST,
  ACCOUNT_DELETE_FAIL,
  ACCOUNT_DELETE_RESET,
  UPDATE_PROFILE_RESET,
} from "../Constants/userConstants";

import axios from "axios";

import { URL_PATH } from "../Helper/global";

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${URL_PATH}/login`,
      { email, password },
      config
    );
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("user", JSON.stringify(data.data));
    localStorage.setItem("favouriteCount", data.data.favourite_count);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { token: data.access_token, user: data.data },
    });
  } catch (error) {
    if (error.response.status === 401) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: { message: error.response.data.message },
      });
    } else {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: { error: error.response.data.errors },
      });
    }
  }
};

// Logout User
export const logout = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post(`${URL_PATH}/logout`, {}, config);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("favouriteCount");

    dispatch({ type: USER_LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`${URL_PATH}/register`, userData, config);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.errors,
    });
  }
};

// Update Password
export const updatePassword =
  (token, prePassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${URL_PATH}/password/update`,
        { prePassword, newPassword },
        config
      );

      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.errors,
      });
    }
  };

// Update Profile
export const updateProfile = (token, profileData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    profileData.append("_method", "PUT");
    const { data } = await axios.post(
      `${URL_PATH}/profile/update`,
      profileData,
      config
    );

    localStorage.setItem("user", JSON.stringify(data.user));

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.message });
    dispatch({
      type: UPDATE_USER,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.errors,
    });
  }
};

// all users
export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USER_REQUEST });
    let link = `${URL_PATH}/users`;

    const { data } = await axios.get(link);
    dispatch({
      type: ALL_USER_SUCCESS,
      payload: { users: data.data },
    });
  } catch (error) {
    dispatch({
      type: ALL_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//delete user data
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.delete(`${URL_PATH}/users/${id}`, config);
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//delete user data
export const deleteAccount = (token) => async (dispatch) => {
  try {
    dispatch({ type: ACCOUNT_DELETE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(
      `${URL_PATH}/users/delete-account`,
      config
    );
    dispatch({
      type: ACCOUNT_DELETE_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ACCOUNT_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// approve user
export const approveUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: APPROVE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`${URL_PATH}/users/${id}/approve`, config);
    dispatch({ type: APPROVE_USER_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: APPROVE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//reset update
export const resetUpdatePassword = () => async (dispatch) => {
  dispatch({ type: UPDATE_PASSWORD_RESET });
};

//reset update
export const resetUpdateProfile = () => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_RESET });
};

//reset approve
export const resetApprove = () => async (dispatch) => {
  dispatch({ type: APPROVE_USER_RESET });
};

//reset delete
export const resetDelete = () => async (dispatch) => {
  dispatch({ type: DELETE_USER_RESET });
};

//reset account delete
export const resetAccountDelete = () => async (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({ type: ACCOUNT_DELETE_RESET });
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
