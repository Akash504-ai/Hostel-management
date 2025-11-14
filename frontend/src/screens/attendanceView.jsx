import React, { useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Card,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getStudentsByRoomNo } from "../actions/studentActions";
import AttendanceTable from "../components/attendanceTable";
import { motion } from "framer-motion";

const AttendanceView = () => {
  const [roomNo, setRoomNo] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!roomNo.trim()) {
      alert("Please enter a valid Room Number");
      return;
    }
    dispatch(getStudentsByRoomNo(roomNo.trim()));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        background: "linear-gradient(135deg, #e0f2fe, #eff6ff)",
        minHeight: "100vh",
        padding: "50px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "180px",
          height: "180px",
          background: "#93c5fd",
          borderRadius: "50%",
          opacity: 0.3,
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          bottom: "-70px",
          left: "-70px",
          width: "200px",
          height: "200px",
          background: "#bfdbfe",
          borderRadius: "50%",
          opacity: 0.3,
        }}
      ></div>

      <Container style={{ position: "relative", zIndex: 2 }}>
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "30px" }}
        >
          <h1
            style={{
              fontWeight: 800,
              color: "#1e3a8a",
              letterSpacing: "0.5px",
            }}
          >
            📘 Hostel Attendance Dashboard
          </h1>
          <p style={{ color: "#64748b", marginTop: "8px" }}>
            Manage daily attendance with ease and speed
          </p>
        </motion.div>

        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            className="shadow-sm mx-auto"
            style={{
              maxWidth: "900px",
              borderRadius: "18px",
              border: "none",
              backdropFilter: "blur(10px)",
            }}
          >
            <Card.Body className="p-5">

              {/* Card Header */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center mb-4"
              >
                <h2
                  style={{
                    fontWeight: "700",
                    color: "#2563eb",
                    letterSpacing: "0.5px",
                  }}
                >
                  📝 Take Attendance
                </h2>
                <p className="text-muted mb-0">
                  Enter a room number to load student attendance
                </p>
              </motion.div>

              {/* Search Form */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <Form onSubmit={submitHandler}>
                  <Row className="justify-content-center align-items-center">
                    <Col xs={10} sm={8} md={6} lg={5}>
                      <Form.Control
                        type="text"
                        value={roomNo}
                        name="roomNo"
                        placeholder="Enter Room Number"
                        onChange={(e) => setRoomNo(e.target.value)}
                        style={{
                          borderRadius: "25px",
                          padding: "12px 18px",
                          border: "1px solid #cbd5e1",
                          boxShadow: "none",
                          fontSize: "1rem",
                        }}
                      />
                    </Col>

                    <Col xs="auto">
                      <motion.div whileHover={{ scale: 1.08 }}>
                        <Button
                          type="submit"
                          style={{
                            borderRadius: "25px",
                            padding: "10px 20px",
                            fontWeight: "600",
                            backgroundColor: "#2563eb",
                            border: "none",
                          }}
                          onMouseOver={(e) =>
                            (e.target.style.backgroundColor = "#1e40af")
                          }
                          onMouseOut={(e) =>
                            (e.target.style.backgroundColor = "#2563eb")
                          }
                        >
                          Search
                        </Button>
                      </motion.div>
                    </Col>
                  </Row>
                </Form>
              </motion.div>

              {/* EMPTY STATE (when roomNo is empty) */}
              {!roomNo && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    marginTop: "40px",
                    textAlign: "center",
                    color: "#64748b",
                  }}
                >
                  <img
                    src="https://undraw.co/api/illustrations/611cd8a124941e009c6f1e20"
                    alt="empty-state"
                    style={{
                      width: "250px",
                      marginBottom: "20px",
                    }}
                  />
                  <p style={{ fontSize: "1rem" }}>
                    Enter a room number to get attendance details
                  </p>
                </motion.div>
              )}

              {/* TABLE SECTION */}
              {roomNo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="mt-5"
                  style={{
                    borderTop: "1px solid #e2e8f0",
                    paddingTop: "20px",
                  }}
                >
                  <AttendanceTable roomNo={roomNo} />
                </motion.div>
              )}
            </Card.Body>
          </Card>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default AttendanceView;
