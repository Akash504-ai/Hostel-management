import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "./loader.jsx";
import Message from "./message.jsx";
import AttendanceTableComponent from "./attendanceTableComponent.jsx";

const AttendanceTable = ({ roomNo }) => {
  const [attendanceMap, setAttendanceMap] = useState({});

  // Redux: students + existing attendance record (if found)
  const getStudentsByRoomNo = useSelector((state) => state.getStudentsByRoomNo);
  const { loading, error, students, attendance } = getStudentsByRoomNo;

  // Redux: update attendance loading/error
  const attendanceDataEnter = useSelector((state) => state.attendanceDataEnter);
  const { loading: loadingAttendance, error: errorAttendance } = attendanceDataEnter;

  /*****************************************************
   * Build attendanceMap ONLY when both are available
   *****************************************************/
  useEffect(() => {
    if (!students || students.length === 0) return;

    const newMap = {};

    // If old attendance exists, load DB values
    if (attendance && attendance.data) {
      students.forEach((student) => {
        newMap[student._id] =
          attendance.data[student._id] || "Hostel";
      });
    } else {
      // No attendance → fill defaults
      students.forEach((student) => {
        newMap[student._id] = "Hostel";
      });
    }

    setAttendanceMap(newMap);
  }, [students, attendance]);

  return (
    <>
      {error && <Message variant="danger">{error}</Message>}

      {loading || loadingAttendance ? (
        <Loading />
      ) : (
        <>
          {errorAttendance && (
            <Message variant="danger">{errorAttendance}</Message>
          )}

          {students && students.length > 0 && (
            <AttendanceTableComponent
              students={students}
              attendanceMap={attendanceMap}
              setAttendanceMap={setAttendanceMap}
              attendance={attendance}
              roomNo={roomNo}
            />
          )}
        </>
      )}
    </>
  );
};

export default AttendanceTable;
