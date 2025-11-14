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
import { motion } from "framer-motion"; // Motion for smooth animations

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
      {/* Decorative floating circles */}
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
          zIndex: 0,
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
          zIndex: 0,
        }}
      ></div>

      <Container style={{ position: "relative", zIndex: 1 }}>
        {/* HEADER SECTION */}
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

        {/* METRICS SECTION */}
        {roomNo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              marginBottom: "25px",
              flexWrap: "wrap",
            }}
          >
            {[
              { title: "Selected Room", value: roomNo, color: "#2563eb" },
              { title: "Total Students", value: "—", color: "#1e40af" },
              { title: "Present Today", value: "—", color: "#16a34a" },
              { title: "Absent", value: "—", color: "#dc2626" },
            ].map((box, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 * i }}
                style={{
                  background: box.color,
                  padding: "18px 25px",
                  borderRadius: "12px",
                  color: "white",
                  minWidth: "150px",
                  textAlign: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              >
                <h5 style={{ margin: 0, fontWeight: 700 }}>{box.value}</h5>
                <p style={{ margin: 0, fontSize: "0.9rem" }}>{box.title}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

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

              {/* Header */}
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

              {/* FORM */}
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

              {/* EMPTY STATE */}
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
                    src="https://cdni.iconscout.com/illustration/premium/thumb/search-folder-illustration-download-in-svg-png-gif-file-formats--analytics-data-documents-pack-business-illustrations-4615650.png"
                    alt="empty"
                    style={{ width: "220px", marginBottom: "15px" }}
                  />
                  <p>Enter a room number to get attendance details</p>
                </motion.div>
              )}

              {/* TABLE */}
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
