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

  // CSV data generation
  const csvData = useMemo(() => {
    if (!attendance?.details || !attendance?.data) return [];

    return Object.entries(attendance.details).map(([id, student]) => ({
      name: student.name,
      contact: student.contact,
      roomNo: student.roomNo,
      status: attendance.data[id] || "N/A",
    }));
  }, [attendance]);

  return (
    <>
      {error && <Message variant="danger">{error}</Message>}

      {loading ? (
        <Loading />
      ) : attendance?.details ? (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact No</th>
                <th>Room No</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(attendance.details).map(([id, student]) => (
                <tr key={id}>
                  <td>{student.name}</td>
                  <td>{student.contact}</td>
                  <td>{student.roomNo}</td>
                  <td>{attendance.data[id] || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <CSVLink
            data={csvData}
            headers={headers}
            filename={`attendance_${new Date()
              .toString()
              .substring(0, 15)}.csv`}
            className="btn btn-primary"
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
