import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Added Routes here
import { Container } from "react-bootstrap";
import Header from "./components/header";
import Footer from "./components/footer";
import HomeView from "./screens/homeView";
import AddStudentView from "./screens/addStudentView";
import AnalysisView from "./screens/analysisView";
import LoginView from "./screens/Authentication Screens/LoginView";
import RegisterView from "./screens/Authentication Screens/RegisterView";
import StudentDetailsView from "./screens/studentDetailsView";
import AttendanceView from "./screens/attendanceView";
import ProfileView from "./screens/profileView";
import UserListView from "./screens/userListView";
import UserEditView from "./screens/userEditView";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            {/* ✅ User Management */}
            <Route path="/user/:userId/edit" element={<UserEditView />} />
            <Route path="/userList" element={<UserListView />} />

            {/* ✅ Profile */}
            <Route path="/profile" element={<ProfileView />} />

            {/* ✅ Attendance and Analysis */}
            <Route path="/attendance" element={<AttendanceView />} />
            <Route path="/analysis" element={<AnalysisView />} />

            {/* ✅ Student Routes */}
            <Route path="/addStudent" element={<AddStudentView />} />
            <Route path="/student/edit/:id" element={<AddStudentView />} />
            <Route path="/student/:id" element={<StudentDetailsView />} />

            {/* ✅ Auth Screens */}
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />

            {/* ✅ Search & Pagination */}
            <Route path="/search/:keyword" element={<HomeView />} />
            <Route path="/page/:pageNumber" element={<HomeView />} />
            <Route
              path="/search/:keyword/page/:pageNumber"
              element={<HomeView />}
            />

            {/* ✅ Default Home */}
            <Route path="/" element={<HomeView />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
