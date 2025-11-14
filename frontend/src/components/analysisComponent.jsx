import React, { useMemo } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loading from "./loader.jsx";
import Message from "./message.jsx";
import { CSVLink } from "react-csv";

const AnalysisComponent = () => {
  const attendanceAnalysis = useSelector((state) => state.attendanceAnalysis);
  const { loading, error, attendance } = attendanceAnalysis;

  const headers = [
    { label: "Name", key: "name" },
    { label: "Contact", key: "contact" },
    { label: "Room No", key: "roomNo" },
    { label: "Status", key: "status" },
  ];

  const csvData = useMemo(() => {
    if (!attendance?.details || !attendance?.data) return [];

    return Object.entries(attendance.details).map(([id, student]) => ({
      name: student.name,
      contact: student.contact,
      roomNo: student.roomNo,
      status: attendance.data[id] || "N/A",
    }));
  }, [attendance]);

  // Inline styles
  const tableContainerStyle = {
    marginTop: "20px",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
  };

  const downloadBtnStyle = {
    display: "inline-block",
    marginTop: "15px",
    padding: "10px 18px",
    backgroundColor: "#0d6efd",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
  };

  const headerStyle = {
    backgroundColor: "#0d6efd",
    color: "white",
    textAlign: "center",
    padding: "10px",
    fontSize: "16px",
  };

  const cellStyle = {
    padding: "10px",
    textAlign: "center",
    fontSize: "14px",
  };

  return (
    <>
      {error && <Message variant="danger">{error}</Message>}

      {loading ? (
        <Loading />
      ) : attendance?.details ? (
        <>
          <div style={tableContainerStyle}>
            <Table striped bordered hover responsive>

              <thead>
                <tr>
                  <th style={headerStyle}>Name</th>
                  <th style={headerStyle}>Contact No</th>
                  <th style={headerStyle}>Room No</th>
                  <th style={headerStyle}>Attendance</th>
                </tr>
              </thead>

              <tbody>
                {Object.entries(attendance.details).map(([id, student]) => (
                  <tr key={id}>
                    <td style={cellStyle}>{student.name}</td>
                    <td style={cellStyle}>{student.contact}</td>
                    <td style={cellStyle}>{student.roomNo}</td>
                    <td style={cellStyle}>{attendance.data[id] || "N/A"}</td>
                  </tr>
                ))}
              </tbody>

            </Table>
          </div>

          <CSVLink
            data={csvData}
            headers={headers}
            filename={`attendance_${new Date()
              .toString()
              .substring(0, 15)}.csv`}
            style={downloadBtnStyle}
          >
            Download CSV
          </CSVLink>
        </>
      ) : (
        <Message variant="info">No attendance data available.</Message>
      )}
    </>
  );
};

export default AnalysisComponent;
