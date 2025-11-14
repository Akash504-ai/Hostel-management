import React, { useState } from "react";
import { Table, Form, Button, Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { postAttendance } from "../actions/attendanceActions";
import Message from "./message.jsx";
import Loading from "./loader.jsx";

const AttendanceTableComponent = ({
  students = [],
  attendanceMap = {},
  setAttendanceMap,
  attendance,
  roomNo,
  loading = false,
  error = null,
}) => {
  const dispatch = useDispatch();
  const [btnHover, setBtnHover] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const updateAttendance = async () => {
    try {
      // prepare payload
      const updatedRoomNos = attendance?.roomNo ? [...attendance.roomNo] : [roomNo];
      const updatedDetails = attendance?.details ? { ...attendance.details } : {};
      const updatedData = { ...attendanceMap };

      if (attendance && !updatedRoomNos.includes(roomNo)) {
        updatedRoomNos.push(roomNo);
      }

      // ensure details include current students
      students.forEach((student) => {
        updatedDetails[student._id] = {
          name: student.name,
          contact: student.contact,
          roomNo: student.roomNo,
        };
      });

      // use ISO date to be robust; backend normalizes anyway
      const payload = {
        roomNo: updatedRoomNos,
        details: updatedDetails,
        data: updatedData,
        date: new Date().toISOString().slice(0, 10), // "YYYY-MM-DD"
      };

      await dispatch(postAttendance(payload));

      setSuccessMsg("Attendance updated successfully ✅");
      // optional: reset map so UI reflects "saved" state
      setAttendanceMap({});
      setTimeout(() => setSuccessMsg(""), 3500);
    } catch (err) {
      console.error("Error updating attendance:", err);
      setSuccessMsg("Failed to update attendance.");
      setTimeout(() => setSuccessMsg(""), 3500);
    }
  };

  const handleStatusChange = (studentId, value) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Home":
        return <Badge bg="info" text="dark" style={{ fontSize: "0.9rem" }}>Home</Badge>;
      case "Outside":
        return <Badge bg="danger" style={{ fontSize: "0.9rem" }}>Outside</Badge>;
      default:
        return <Badge bg="success" style={{ fontSize: "0.9rem" }}>Hostel</Badge>;
    }
  };

  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: 20, marginTop: 20 }}>
      <h4 className="text-center fw-bold mb-4" style={{ color: "#2563eb" }}>
        Attendance Management
      </h4>

      {loading && <Loading />}
      {error && <Message variant="danger">{error}</Message>}
      {successMsg && <Message variant={successMsg.includes("Failed") ? "danger" : "success"}>{successMsg}</Message>}

      <Table hover responsive bordered className="align-middle shadow-sm" style={{ borderRadius: 10, overflow: "hidden" }}>
        <thead style={{ background: "#2563eb", color: "white" }}>
          <tr className="text-center">
            <th style={{ width: "22%" }}>Name</th>
            <th style={{ width: "18%" }}>Select Status</th>
            <th style={{ width: "15%" }}>Current Status</th>
            <th style={{ width: "20%" }}>Contact</th>
            <th style={{ width: "20%" }}>City</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {students && students.length > 0 ? (
            students.map((student) => {
              const currentStatus = attendanceMap[student._id] || "Hostel";
              return (
                <tr key={student._id}>
                  <td>
                    <Link to={`/student/${student._id}`} style={{ color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>
                      {student.name}
                    </Link>
                  </td>

                  <td>
                    <Form.Select
                      size="sm"
                      value={currentStatus}
                      onChange={(e) => handleStatusChange(student._id, e.target.value)}
                      style={{ borderRadius: 8, borderColor: "#cbd5e1", cursor: "pointer" }}
                    >
                      <option value="Hostel">Hostel</option>
                      <option value="Home">Home</option>
                      <option value="Outside">Outside</option>
                    </Form.Select>
                  </td>

                  <td>{getStatusBadge(currentStatus)}</td>

                  <td>
                    <a href={student.contact ? `tel:${student.contact}` : "#"} style={{ textDecoration: "none", color: "#1e293b", fontWeight: 500 }}>
                      {student.contact || "—"}
                    </a>
                  </td>

                  <td style={{ color: "#475569" }}>{student.city || "—"}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-muted">No students found for this room.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {students && students.length > 0 && (
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="success"
            size="lg"
            onClick={updateAttendance}
            style={{
              borderRadius: 10,
              padding: "8px 22px",
              background: btnHover ? "#15803d" : "#16a34a",
              fontWeight: 600,
              boxShadow: "0 3px 8px rgba(16,185,129,0.3)",
              transition: "0.15s",
            }}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
          >
            ✅ Update Attendance
          </Button>
        </div>
      )}
    </div>
  );
};

export default AttendanceTableComponent;
