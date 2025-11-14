import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Loading from "../components/loader";
import Message from "../components/message";
import {
  getStudentDetails,
  updateStudent,
  deleteStudent,
} from "../actions/studentActions";
import { STUDENT_UPDATE_RESET } from "../constants/studentConstant";

const StudentDetailsView = () => {
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const studentDetails = useSelector((state) => state.studentDetails);
  const { loading, error, student } = studentDetails;

  const studentUpdate = useSelector((state) => state.studentUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = studentUpdate;

  const studentDelete = useSelector((state) => state.studentDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = studentDelete;

  useEffect(() => {
    if (successDelete) {
      navigate("/");
    } else {
      if (successUpdate) {
        dispatch({ type: STUDENT_UPDATE_RESET });
      }
      if (!student || student._id !== id) {
        dispatch(getStudentDetails(id));
      } else if (!status) {
        setStatus(student.status);
      }
    }
  }, [dispatch, id, successUpdate, successDelete, navigate, student, status]);

  const navigateToEdit = () => {
    navigate(`/student/edit/${student._id}`, {
      state: { studentProps: student },
    });
  };

  const updateStatus = () => {
    if (student) {
      dispatch(updateStudent({ ...student, status }));
    }
  };

  const deleteStudentHandler = () => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(student._id));
    }
  };

  return (
    <>
      {/* Go Back Button */}
      <Link
        to="/"
        style={{
          display: "inline-block",
          padding: "8px 16px",
          borderRadius: "6px",
          background: "#f2f2f2",
          border: "1px solid #ddd",
          marginBottom: "20px",
          textDecoration: "none",
          color: "#000",
        }}
      >
        Go Back
      </Link>

      {loading || loadingUpdate || loadingDelete ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}

          {student && (
            <Row style={{ display: "flex", gap: "20px" }}>
              {/* Student Image */}
              <Col md={3}>
                <Image
                  src={student.image}
                  alt={student.name}
                  fluid
                  rounded
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                />
              </Col>

              {/* Basic Info Card */}
              <Col md={4}>
                <Card
                  style={{
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    border: "none",
                  }}
                >
                  <ListGroup variant="flush">
                    <ListGroup.Item style={{ border: "none" }}>
                      <h3 style={{ marginBottom: "5px" }}>{student.name}</h3>
                      <small style={{ color: "#777" }}>
                        Stream: {student.category}
                      </small>
                    </ListGroup.Item>

                    <ListGroup.Item style={{ border: "none" }}>
                      <strong>Phone:</strong>{" "}
                      <a href={`tel:${student.contact}`}>
                        {student.contact}
                      </a>
                    </ListGroup.Item>

                    <ListGroup.Item style={{ border: "none" }}>
                      <strong>Father’s Contact:</strong>{" "}
                      <a href={`tel:${student.fatherContact}`}>
                        {student.fatherContact}
                      </a>
                    </ListGroup.Item>

                    <ListGroup.Item style={{ border: "none" }}>
                      <strong>City:</strong> {student.city}
                    </ListGroup.Item>

                    <ListGroup.Item style={{ border: "none" }}>
                      <strong>Address:</strong> {student.address}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>

              {/* Status / Update Card */}
              <Col md={4}>
                <Card
                  style={{
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    border: "none",
                  }}
                >
                  <ListGroup variant="flush">
                    <ListGroup.Item style={{ border: "none" }}>
                      <Row>
                        <Col>Room No:</Col>
                        <Col>{student.roomNo}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item style={{ border: "none" }}>
                      <Row>
                        <Col>Block No:</Col>
                        <Col>{student.blockNo}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item style={{ border: "none" }}>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            size="sm"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            style={{
                              padding: "6px",
                              borderRadius: "6px",
                              border: "1px solid #ccc",
                            }}
                          >
                            {["Hostel", "Outside", "Home"].map((x) => (
                              <option key={x} value={x}>
                                {x}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item style={{ border: "none" }}>
                      <Button
                        onClick={updateStatus}
                        style={{
                          width: "100%",
                          background: "#28a745",
                          border: "none",
                          padding: "10px",
                          borderRadius: "6px",
                          color: "#fff",
                          fontWeight: "600",
                        }}
                      >
                        Update Status
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>

              {/* Action Buttons */}
              <Col md={1}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Button
                    onClick={navigateToEdit}
                    style={{
                      border: "1px solid #007bff",
                      padding: "8px",
                      borderRadius: "6px",
                      color: "#007bff",
                      background: "transparent",
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </Button>

                  <Button
                    onClick={deleteStudentHandler}
                    style={{
                      background: "#dc3545",
                      border: "none",
                      padding: "8px",
                      borderRadius: "6px",
                      color: "#fff",
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </div>
              </Col>
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default StudentDetailsView;
