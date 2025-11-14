import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  Container,
  Button,
} from "react-bootstrap";
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
  const location = useLocation();

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
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        padding: "40px 0",
      }}
    >
      <Container>
        {/* Header Section */}
        <Row className="align-items-center justify-content-between mb-4">
          <Col md={6}>
            <h2
              style={{
                color: "#2563eb",
                fontWeight: "700",
                letterSpacing: "0.5px",
              }}
            >
              👩‍🎓 Student Management
            </h2>
            <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
              View, manage, and analyze student data efficiently
            </p>
          </Col>

          <Col md="auto">
            <ButtonGroup style={{ borderRadius: "7px", overflow: "hidden" }}>
              <ToggleButton
                id="grid-view"
                type="radio"
                variant={isGrid ? "primary" : "outline-primary"}
                name="viewType"
                value="Grid"
                checked={isGrid}
                onChange={() => toggleView("Grid")}
                style={{
                  fontWeight: "500",
                  padding: "8px 16px",
                  borderRadius: "0",
                }}
              >
                 Grid View
              </ToggleButton>
              <ToggleButton
                id="table-view"
                type="radio"
                variant={!isGrid ? "primary" : "outline-primary"}
                name="viewType"
                value="Table"
                checked={!isGrid}
                onChange={() => toggleView("Table")}
                style={{
                  fontWeight: "500",
                  padding: "8px 16px",
                  borderRadius: "0",
                }}
              >
                 Table View
              </ToggleButton>
            </ButtonGroup>
          </Col>
        </Row>

        {/* Divider Line */}
        <hr style={{ borderTop: "2px solid #e5e7eb" }} />

        {/* Main Section */}
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {isGrid ? (
              <>
                <Row className="gy-4 mt-3">
                  {students.length > 0 ? (
                    students.map((student) => (
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
                        <Student studentDetails={student} />
                      </Col>
                    ))
                  ) : (
                    <Col className="text-center">
                      <Message variant="info">No students found.</Message>
                    </Col>
                  )}
                </Row>

                {/* Pagination */}
                <div className="d-flex justify-content-center mt-5">
                  <Paginate pages={pages} page={page} keyword={keyword || ""} />
                </div>
              </>
            ) : (
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  marginTop: "20px",
                }}
              >
                <StudentsTableView keyword={keyword} pageNumber={pageNumber} />
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default HomeView;
