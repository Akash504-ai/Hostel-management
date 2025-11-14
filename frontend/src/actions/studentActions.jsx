import {
  STUDENT_LIST_REQUEST,
  STUDENT_LIST_SUCCESS,
  STUDENT_LIST_ERROR,
  STUDENT_ADD_ERROR,
  STUDENT_ADD_REQUEST,
  STUDENT_ADD_SUCCESS,
  STUDENT_DELETE_ERROR,
  STUDENT_DELETE_REQUEST,
  STUDENT_DELETE_SUCCESS,
  STUDENT_UPDATE_ERROR,
  STUDENT_UPDATE_REQUEST,
  STUDENT_UPDATE_SUCCESS,
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_SUCCESS,
  STUDENT_DETAILS_ERROR,
  STUDENT_ROOM_NO_REQUEST,
  STUDENT_ROOM_NO_SUCCESS,
  STUDENT_ROOM_NO_ERROR,
} from "../constants/studentConstant";
import axios from "axios";

// ✅ Correct backend base route
const API_BASE_URL =
  process.env.REACT_APP_BACKEND_URL ||
  "https://hostel-management-h4q6.onrender.com/api/student";


// 🧩 Get all students (paginated + search)
export const listStudents = (keyword = "", pageNumber = "") => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: STUDENT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Backend expects: /student/all?keyword=&page=
    const { data } = await axios.get(
      `${API_BASE_URL}/all?keyword=${keyword}&page=${pageNumber}`,
      config
    );

    dispatch({
      type: STUDENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_LIST_ERROR,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// 🧩 Add a new student
export const addStudent = (student) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_ADD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`${API_BASE_URL}/add`, student, config);

    dispatch({
      type: STUDENT_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_ADD_ERROR,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// 🧩 Get student details by ID
export const getStudentDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API_BASE_URL}/${id}`, config);

    dispatch({
      type: STUDENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_DETAILS_ERROR,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// 🧩 Update student info
export const updateStudent = (student) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${API_BASE_URL}/${student._id}`,
      student,
      config
    );

    dispatch({
      type: STUDENT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_UPDATE_ERROR,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// 🧩 Delete a student
export const deleteStudent = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`${API_BASE_URL}/${id}`, config);

    dispatch({
      type: STUDENT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_DELETE_ERROR,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// 🧩 Get all students in a room
export const getStudentsByRoomNo = (roomNo) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_ROOM_NO_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Backend route: /student/room/:roomId
    const { data } = await axios.get(
      `${API_BASE_URL}/room/${roomNo}`,
      config
    );

    dispatch({
      type: STUDENT_ROOM_NO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_ROOM_NO_ERROR,
      payload: error.response?.data?.message || error.message,
    });
  }
};
