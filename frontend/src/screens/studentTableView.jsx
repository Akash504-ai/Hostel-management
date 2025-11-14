import React, { useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/message";
import Loading from "../components/loader";
import Paginate from "../components/paginate";
import { listStudents } from "../actions/studentActions";

const StudentsTableView = ({ keyword = "", pageNumber = 1 }) => {
  const dispatch = useDispatch();

  const studentsList = useSelector((state) => state.studentsList);
  const { loading, error, students = [], page, pages } = studentsList;

  // ✅ Fetch whenever keyword or page changes
  useEffect(() => {
    if (!students || students.length === 0) {
      dispatch(listStudents(keyword, pageNumber));
    }
    // eslint-disable-next-line
  }, [dispatch, keyword, pageNumber]);

  return (
    <Container
      className="mt-4 p-4 bg-white rounded shadow-sm"
      style={{ maxWidth: "1100px" }}
    >
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {students.length === 0 ? (
            <Message variant="info">No students found.</Message>
          ) : (
            <>
              <Table
                striped
                bordered
                hover
                responsive
                className="table-sm align-middle shadow-sm"
              >
                <thead className="table-dark text-center">
                  <tr>
                    <th>Stream</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Contact</th>
                    <th>Room No</th>
                    <th>City</th>
                  </tr>
                </thead>

                <tbody className="text-center">
                  {students.map((student) => {
                    const statusColor =
                      student.status === "Outside"
                        ? "red"
                        : student.status === "Home"
                        ? "blue"
                        : "green";

                    return (
                      <tr key={student._id}>
                        <td>{student.category}</td>

                        <td>
                          <Link
                            to={`/student/${student._id}`}
                            className="text-decoration-none fw-semibold"
                          >
                            {student.name}
                          </Link>
                        </td>

                        <td style={{ color: statusColor, fontWeight: "500" }}>
                          {student.status || "Hostel"}
                        </td>

                        <td>
                          <a
                            href={`tel:${student.contact}`}
                            className="text-decoration-none"
                          >
                            {student.contact}
                          </a>
                        </td>

                        <td>{student.roomNo}</td>
                        <td>{student.city}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              <div className="d-flex justify-content-center mt-3">
                <Paginate
                  pages={pages}
                  page={page}
                  keyword={keyword || ""}
                  isAdmin={true}
                />
              </div>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default StudentsTableView;
