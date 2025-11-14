import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";
import { motion } from "framer-motion"; // Animation library
import Student from "../components/student";
import Loading from "../components/loader";
import Message from "../components/message";
import Paginate from "../components/paginate";
import StudentsTableView from "./studentTableView";
import { listStudents } from "../actions/studentActions";

const HomeView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [isGrid, setIsGrid] = useState(true);

  const keyword = params.keyword || "";
  const pageNumber = params.pageNumber || 1;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: userLoading, userInfo } = userLogin;

  const studentsList = useSelector((state) => state.studentsList);
  const { loading, error, students = [], page, pages } = studentsList;

  useEffect(() => {
    if (!userLoading && !userInfo) {
      navigate("/login");
    } else {
      dispatch(listStudents(keyword, pageNumber));
    }
  }, [dispatch, navigate, userInfo, userLoading, keyword, pageNumber]);

  const toggleView = (viewType) => {
    setIsGrid(viewType === "Grid");
  };

  return (
    <div
      style={{
        backgroundColor: "#f1f5f9",
        minHeight: "100vh",
        padding: "0 0 40px 0",
      }}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          width: "100%",
          padding: "60px 20px",
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <Container>
          <h1
            style={{
              fontWeight: "700",
              marginBottom: "8px",
              color: "#0f172a",
              fontSize: "2rem",
            }}
          >
            Student Management Dashboard
          </h1>
          <p
            style={{
              color: "#475569",
              fontSize: "1rem",
              marginBottom: "0",
              maxWidth: "550px",
            }}
          >
            A clean and modern interface to view, manage, and organize student data effortlessly.
          </p>
        </Container>
      </motion.div>

      <Container style={{ marginTop: "40px" }}>
        {/* Header Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Row className="align-items-center justify-content-between mb-3">
            <Col md={6}>
              <h3
                style={{
                  color: "#1e293b",
                  fontWeight: "700",
                  letterSpacing: "0.3px",
                  marginBottom: "4px",
                }}
              >
                📋 Student Records
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
                Switch between grid or table view anytime.
              </p>
            </Col>

            <Col md="auto">
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#e2e8f0",
                  padding: "5px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  gap: "6px",
                }}
              >
                <Button
                  onClick={() => toggleView("Grid")}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor: isGrid ? "#2563eb" : "transparent",
                    color: isGrid ? "#fff" : "#1e293b",
                    fontWeight: "600",
                    transition: "0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: isGrid ? "0 2px 6px rgba(0,0,0,0.15)" : "none",
                  }}
                >
                  📦 Grid
                </Button>

                <Button
                  onClick={() => toggleView("Table")}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor: !isGrid ? "#2563eb" : "transparent",
                    color: !isGrid ? "#fff" : "#1e293b",
                    fontWeight: "600",
                    transition: "0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: !isGrid ? "0 2px 6px rgba(0,0,0,0.15)" : "none",
                  }}
                >
                  📊 Table
                </Button>
              </div>
            </Col>
          </Row>
        </motion.div>

        <hr style={{ borderTop: "2px solid #e2e8f0" }} />

        {/* Content Section */}
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {isGrid ? (
              <>
                {/* GRID VIEW */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <Row className="gy-4 mt-3">
                    {students.length > 0 ? (
                      students.map((student, index) => (
                        <Col
                          key={student._id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: index * 0.05,
                            }}
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Student studentDetails={student} />
                          </motion.div>
                        </Col>
                      ))
                    ) : (
                      <Col className="text-center">
                        <Message variant="info">No students found.</Message>
                      </Col>
                    )}
                  </Row>
                </motion.div>

                <div className="d-flex justify-content-center mt-5">
                  <Paginate pages={pages} page={page} keyword={keyword || ""} />
                </div>
              </>
            ) : (
              // TABLE VIEW
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  marginTop: "20px",
                }}
              >
                <StudentsTableView keyword={keyword} pageNumber={pageNumber} />
              </motion.div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default HomeView;
