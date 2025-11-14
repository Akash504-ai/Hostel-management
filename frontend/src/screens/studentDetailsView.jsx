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
      <Link className="btn btn-light my-3" to="/">
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
            <Row className="g-4">
              {/* Student Image */}
              <Col md={3}>
                <Image
                  src={student.image}
                  alt={student.name}
                  fluid
                  rounded
                  className="shadow-sm"
                />
              </Col>

              {/* Basic Info */}
              <Col md={4}>
                <Card className="p-3 shadow-sm">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3 className="mb-0">{student.name}</h3>
                      <small className="text-muted">
                        Stream: {student.category}
                      </small>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Phone:</strong>{" "}
                      <a href={`tel:${student.contact}`}>{student.contact}</a>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Father’s Contact:</strong>{" "}
                      <a href={`tel:${student.fatherContact}`}>
                        {student.fatherContact}
                      </a>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>City:</strong> {student.city}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Address:</strong> {student.address}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>

              {/* Status / Update Section */}
              <Col md={4}>
                <Card className="p-3 shadow-sm">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Room No:</Col>
                        <Col>{student.roomNo}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Block No:</Col>
                        <Col>{student.blockNo}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          <Form.Control
                            size="sm"
                            as="select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
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
                    <ListGroup.Item>
                      <Button
                        className="w-100"
                        variant="success"
                        onClick={updateStatus}
                      >
                        Update Status
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>

              {/* Action Buttons */}
              <Col md={1} className="d-flex flex-column justify-content-start">
                <Button
                  variant="outline-primary"
                  className="mb-2"
                  onClick={navigateToEdit}
                >
                  <i className="fas fa-edit"></i>
                </Button>
                <Button variant="danger" onClick={deleteStudentHandler}>
                  <i className="fas fa-trash"></i>
                </Button>
              </Col>
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default StudentDetailsView;
