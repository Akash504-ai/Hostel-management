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
import { motion } from "framer-motion";

// ⭐ Using Chart.js V2 (WORKS WITH VERCEL + CRA)
import { Line, Doughnut } from "react-chartjs-2";

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

  // -------------------------
  // ⭐ CHARTS (V2 COMPATIBLE)
  // -------------------------

  const lineChartData = {
    labels: attendance?.map((a) => a.date) || [],
    datasets: [
      {
        label: "Present Count",
        data: attendance?.map((a) => a.present) || [],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.25)",
        borderWidth: 3,
        pointRadius: 4,
        lineTension: 0.4, // smooth curve
      },
    ],
  };

  const pieChartData = {
    labels: ["Present", "Absent", "Outside"],
    datasets: [
      {
        data: [
          attendance?.reduce((t, a) => t + a.present, 0),
          attendance?.reduce((t, a) => t + a.absent, 0),
          attendance?.reduce((t, a) => t + a.outside, 0),
        ],
        backgroundColor: ["#16a34a", "#dc2626", "#2563eb"],
        borderColor: "#fff",
        borderWidth: 3,
      },
    ],
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

          {/* STATUS */}
          {(loadingDelete || loading) && <Loading />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {successDelete && (
            <Message variant="success">
              ✅ Old attendance deleted successfully
            </Message>
          )}

          {/* TABLE */}
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

          {/* ⭐ CHARTS SECTION */}
          <div
            style={{
              marginTop: "40px",
              display: "flex",
              gap: "25px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {/* LINE CHART */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                width: "520px",
              }}
            >
              <h6 className="fw-bold mb-3" style={{ color: "#2563eb" }}>
                📈 Attendance Trend (Line Graph)
              </h6>
              <Line data={lineChartData} />
            </motion.div>

            {/* PIE CHART */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                width: "420px",
              }}
            >
              <h6 className="fw-bold mb-3" style={{ color: "#2563eb" }}>
                🥧 Attendance Breakdown (Pie Chart)
              </h6>
              <Doughnut data={pieChartData} />
            </motion.div>
          </div>

          {/* MODAL (unchanged) */}
          <Modal show={modal} onHide={closeModal} centered>
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "#dc2626" }}>
                Delete Old Attendance
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Enter number of days</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    placeholder="e.g. 30"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={startDelete}>
                Confirm Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </motion.div>
    </motion.div>
  );
};

export default AnalysisView;
