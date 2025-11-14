import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import {
  deleteAttendanceByDate,
  getAnalysisByDate,
} from "../actions/attendanceActions";
import AnalysisComponent from "../components/analysisComponent";
import Loading from "../components/loader";
import Message from "../components/message";
import { motion } from "framer-motion"; // ⭐ Added Motion

const AnalysisView = () => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [days, setDays] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const attendanceAnalysis = useSelector((state) => state.attendanceAnalysis);
  const { loading, error, attendance } = attendanceAnalysis;

  const attendanceDelete = useSelector((state) => state.attendanceDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = attendanceDelete;

  useEffect(() => {
    dispatch(getAnalysisByDate(startDate.toISOString().substring(0, 10)));
  }, [dispatch, startDate]);

  useEffect(() => {
    if (successDelete) {
      dispatch(getAnalysisByDate(startDate.toISOString().substring(0, 10)));
    }
  }, [dispatch, successDelete, startDate]);

  const showModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const startDelete = () => {
    if (!days || days <= 0) return alert("Please enter a valid number of days.");
    dispatch(deleteAttendanceByDate(days));
    setModal(false);
    setDays("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Col
          md={10}
          className="mx-auto bg-white rounded shadow-sm p-4"
          style={{ maxWidth: "1100px" }}
        >
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Row
              className="align-items-center justify-content-between mb-4"
              style={{
                display: "flex",
                flexWrap: "wrap",
                rowGap: "10px",
              }}
            >
              <Col xs="12" md="6">
                <div>
                  <h3
                    className="fw-bold mb-1"
                    style={{ color: "#2563eb", letterSpacing: "0.5px" }}
                  >
                    Attendance Analysis
                  </h3>
                  <small className="text-muted">
                    View and manage attendance records by date
                  </small>
                </div>
              </Col>

              <Col
                xs="12"
                md="6"
                className="d-flex justify-content-md-end justify-content-center gap-2"
              >
                <motion.div whileHover={{ scale: 1.04 }}>
                  <Link
                    to="/"
                    className="btn btn-outline-secondary"
                    style={{
                      borderRadius: "8px",
                      padding: "6px 16px",
                      fontWeight: "500",
                      minWidth: "120px",
                    }}
                  >
                    ← Go Back
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.04 }}>
                  <Button
                    variant="outline-danger"
                    onClick={showModal}
                    style={{
                      borderRadius: "8px",
                      padding: "6px 16px",
                      fontWeight: "500",
                      minWidth: "150px",
                    }}
                  >
                    🗑 Delete Records
                  </Button>
                </motion.div>
              </Col>
            </Row>
          </motion.div>

          {/* DATE PICKER */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Row
              className="align-items-center mb-4 bg-light rounded py-3 px-3 shadow-sm"
              style={{ borderLeft: "5px solid #2563eb" }}
            >
              <Col md={6}>
                <h6 className="mb-1 text-muted">Showing Data For:</h6>
                <strong style={{ color: "#1e3a8a", fontSize: "1.1rem" }}>
                  {startDate.toISOString().substring(0, 10)}
                </strong>
              </Col>
              <Col md={6} className="text-end">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                />
              </Col>
            </Row>
          </motion.div>

          {/* STATUS MESSAGES */}
          {(loadingDelete || loading) && <Loading />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {successDelete && (
            <Message variant="success">
              ✅ Old attendance deleted successfully
            </Message>
          )}

          {/* ANALYSIS TABLE */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-3 rounded shadow-sm"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
            }}
          >
            <AnalysisComponent />
          </motion.div>

          {/* MODAL WITH ANIMATION */}
          <Modal
            show={modal}
            onHide={closeModal}
            centered
            dialogClassName="fade-in-modal"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Modal.Header
                closeButton
                style={{
                  backgroundColor: "#f8fafc",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <Modal.Title
                  className="fw-semibold"
                  style={{ color: "#dc2626", fontSize: "1.1rem" }}
                >
                  Delete Old Attendance Records
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="days">
                    <Form.Label className="fw-medium">
                      Enter number of days to delete records older than:
                    </Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      placeholder="e.g. 30"
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                      style={{
                        borderRadius: "8px",
                        borderColor: "#cbd5e1",
                        padding: "8px 10px",
                      }}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer style={{ borderTop: "1px solid #e2e8f0" }}>
                <Button
                  variant="secondary"
                  onClick={closeModal}
                  style={{
                    borderRadius: "8px",
                    padding: "5px 16px",
                    fontWeight: "500",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={startDelete}
                  style={{
                    borderRadius: "8px",
                    padding: "5px 16px",
                    fontWeight: "600",
                    backgroundColor: "#dc2626",
                  }}
                >
                  Confirm Delete
                </Button>
              </Modal.Footer>
            </motion.div>
          </Modal>
        </Col>
      </motion.div>
    </motion.div>
  );
};

export default AnalysisView;
