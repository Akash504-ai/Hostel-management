import axios from "axios";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_RESET,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
} from "../constants/userConstants";

const API_BASE_URL = "/api/users"; // ✅ consistent API base path

// 🧩 User Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `${API_BASE_URL}/login`,
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// 🧩 Logout
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_LIST_RESET });
  document.location.href = "/login";
};

// 🧩 Register New User
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `${API_BASE_URL}`,
      { name, email, password },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// 🧩 Get User Details (profile or by ID)
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    const { data } = await axios.get(`${API_BASE_URL}/${id}`, config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    if (message === "Not authorized, token failed") dispatch(logout());
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};

// 🧩 Update Logged-in User Profile
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`${API_BASE_URL}/profile`, user, config);

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    if (message === "Not authorized, token failed") dispatch(logout());
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};

// 🧩 Get All Users (Admin)
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    const { data } = await axios.get(`${API_BASE_URL}`, config);

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    if (message === "Not authorized, token failed") dispatch(logout());
    dispatch({ type: USER_LIST_FAIL, payload: message });
  }
};

// 🧩 Delete User (Admin)
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    await axios.delete(`${API_BASE_URL}/${id}`, config);
    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    if (message === "Not authorized, token failed") dispatch(logout());
    dispatch({ type: USER_DELETE_FAIL, payload: message });
  }
};

// 🧩 Update User (Admin)
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`${API_BASE_URL}/${user._id}`, user, config);

    dispatch({ type: USER_UPDATE_SUCCESS });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    dispatch({ type: USER_DETAILS_RESET });
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    if (message === "Not authorized, token failed") dispatch(logout());
    dispatch({ type: USER_UPDATE_FAIL, payload: message });
  }
};
