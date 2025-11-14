import {
  ATTENDANCE_DATA_ENTER_FAIL,
  ATTENDANCE_DATA_ENTER_REQUEST,
  ATTENDANCE_DATA_ENTER_SUCCESS,
  ATTENDANCE_ANALYSIS_FAIL,
  ATTENDANCE_ANALYSIS_REQUEST,
  ATTENDANCE_ANALYSIS_SUCCESS,
  ATTENDANCE_DELETE_REQUEST,
  ATTENDANCE_DELETE_SUCCESS,
  ATTENDANCE_DELETE_FAIL,
} from "../constants/attendanceConstant";

import axios from "axios";

// 🔹 Smart backend URL (works in local + production)
const API_BASE_URL =
  process.env.REACT_APP_BACKEND_URL ||
  "https://hostel-management-h4q6.onrender.com/api/attendance";

// 🧩 Enter (Add/Update) Attendance
export const postAttendance = (attendance) => async (dispatch, getState) => {
  try {
    dispatch({ type: ATTENDANCE_DATA_ENTER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Normalize date BEFORE sending
    const normalizedDate = new Date(attendance.date || Date.now()).toDateString();

    const payload = { ...attendance, date: normalizedDate };

    const { data } = await axios.post(`${API_BASE_URL}/`, payload, config);

    dispatch({
      type: ATTENDANCE_DATA_ENTER_SUCCESS,
      payload: data.attendance, // return updated attendance
    });
  } catch (error) {
    dispatch({
      type: ATTENDANCE_DATA_ENTER_FAIL,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Attendance submit failed",
    });
  }
};

// 🧩 Get Attendance Analysis by Date
export const getAnalysisByDate = (date) => async (dispatch, getState) => {
  try {
    dispatch({ type: ATTENDANCE_ANALYSIS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const normalizedDate = new Date(date || Date.now()).toDateString();

    const { data } = await axios.post(
      `${API_BASE_URL}/analysis`,
      { date: normalizedDate },
      config
    );

    dispatch({
      type: ATTENDANCE_ANALYSIS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ATTENDANCE_ANALYSIS_FAIL,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch analysis",
    });
  }
};

// 🧩 Delete Attendance older than X days
export const deleteAttendanceByDate = (days) => async (dispatch, getState) => {
  try {
    dispatch({ type: ATTENDANCE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `${API_BASE_URL}/cleanup/${days}`,
      config
    );

    dispatch({
      type: ATTENDANCE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ATTENDANCE_DELETE_FAIL,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Failed to delete attendance data",
    });
  }
};
