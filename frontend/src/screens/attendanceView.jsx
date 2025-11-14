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
import { motion } from "framer-motion"; // ⭐ Added Motion

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
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        padding: "50px 20px",
      }}
    >
      <Container>
        {/* Main Card Animation */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            className="shadow-sm mx-auto"
            style={{
              maxWidth: "900px",
              borderRadius: "15px",
              border: "none",
            }}
          >
            <Card.Body className="p-5">
              {/* Header Animation */}
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
                  Enter a room number to view and update student attendance
                </p>
              </motion.div>

              {/* Search Form Animation */}
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

                    {/* Button animation on hover */}
                    <Col xs="auto">
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Button
                          type="submit"
                          variant="primary"
                          style={{
                            borderRadius: "25px",
                            padding: "10px 20px",
                            fontWeight: "600",
                            letterSpacing: "0.3px",
                            backgroundColor: "#2563eb",
                            border: "none",
                            transition: "all 0.3s ease",
                          }}
                          onMouseOver={(e) =>
                            (e.target.style.backgroundColor = "#1e40af")
                          }
                          onMouseOut={(e) =>
                            (e.target.style.backgroundColor = "#2563eb")
                          }
                        >
                          Get Students
                        </Button>
                      </motion.div>
                    </Col>
                  </Row>
                </Form>
              </motion.div>

              {/* Attendance Table Animation */}
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
