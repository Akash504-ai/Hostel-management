import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  studentListReducer,
  studentAddReducer,
  studentDetailsReducer,
  getStudentsByRoomNoReducer,
  studentUpdateReducer,
  studentDeleteReducer,
} from "./reducers/studentsReducer.jsx";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers.jsx";
import {
  attendanceDataEnterReducer,
  attendanceAnalysisReducer,
  deleteAttendanceReducer,
} from "./reducers/attendanceReducer.jsx";

// ✅ Combine all reducers
const reducer = combineReducers({
  studentsList: studentListReducer,
  studentDetails: studentDetailsReducer,
  studentAdd: studentAddReducer,
  studentUpdate: studentUpdateReducer,
  studentDelete: studentDeleteReducer,
  getStudentsByRoomNo: getStudentsByRoomNoReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  attendanceDataEnter: attendanceDataEnterReducer,
  attendanceAnalysis: attendanceAnalysisReducer,
  attendanceDelete: deleteAttendanceReducer,
});

// ✅ Load user data from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// ✅ Initial state
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

// ✅ Create store using Redux Toolkit
const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
