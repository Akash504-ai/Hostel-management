import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "../components/message";
import Loader from "../components/loader";
import { listUsers, deleteUser } from "../actions/userActions";
import { motion } from "framer-motion";

const UserListView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users = [] } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, successDelete, userInfo]);

  const deleteHandler = (id, name) => {
    if (window.confirm(`Are you sure you want to delete user "${name}"?`)) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "linear-gradient(135deg, #e0f2fe, #eef2ff)",
      }}
    >
      <Container style={{ maxWidth: "1100px" }}>
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            marginBottom: "25px",
            background: "white",
            padding: "20px 25px",
            borderRadius: "14px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              fontWeight: "800",
              color: "#1e3a8a",
              marginBottom: "5px",
            }}
          >
            👥 User Management
          </h2>
          <small style={{ color: "#64748b" }}>
            Manage users, roles, and permissions
          </small>
        </motion.div>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : users.length === 0 ? (
          <Message variant="info">No users found.</Message>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              background: "white",
              borderRadius: "15px",
              padding: "20px",
              boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
            }}
          >
            <Table
              responsive
              hover
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                marginBottom: 0,
              }}
            >
              <thead
                style={{
                  background: "#1e40af",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <tr>
                  <th style={{ padding: "14px" }}>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody style={{ textAlign: "center" }}>
                {users.map((user) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: "#f8fafc",
                      marginBottom: "8px",
                    }}
                  >
                    <td style={{ color: "#64748b", padding: "12px" }}>
                      {user._id}
                    </td>

                    <td style={{ fontWeight: "600" }}>{user.name}</td>

                    <td>
                      <a
                        href={`mailto:${user.email}`}
                        style={{
                          textDecoration: "none",
                          color: "#2563eb",
                          fontWeight: 500,
                        }}
                      >
                        {user.email}
                      </a>
                    </td>

                    <td>
                      {user.isAdmin ? (
                        <span
                          style={{
                            background: "#16a34a",
                            padding: "6px 14px",
                            borderRadius: "20px",
                            color: "white",
                            fontWeight: "600",
                            fontSize: "0.85rem",
                          }}
                        >
                          Admin
                        </span>
                      ) : (
                        <span
                          style={{
                            background: "#6b7280",
                            padding: "6px 14px",
                            borderRadius: "20px",
                            color: "white",
                            fontWeight: "600",
                            fontSize: "0.85rem",
                          }}
                        >
                          User
                        </span>
                      )}
                    </td>

                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "10px",
                        }}
                      >
                        {/* EDIT BUTTON */}
                        <LinkContainer to={`/user/${user._id}/edit`}>
                          <Button
                            style={{
                              borderRadius: "6px",
                              border: "1px solid #2563eb",
                              color: "#2563eb",
                              padding: "5px 10px",
                              fontWeight: "600",
                            }}
                            onMouseOver={(e) => {
                              e.target.style.background = "#2563eb";
                              e.target.style.color = "white";
                            }}
                            onMouseOut={(e) => {
                              e.target.style.background = "transparent";
                              e.target.style.color = "#2563eb";
                            }}
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>

                        {/* DELETE BUTTON */}
                        <Button
                          style={{
                            borderRadius: "6px",
                            border: "1px solid #dc2626",
                            color: "#dc2626",
                            padding: "5px 10px",
                            fontWeight: "600",
                          }}
                          onMouseOver={(e) => {
                            e.target.style.background = "#dc2626";
                            e.target.style.color = "white";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.background = "transparent";
                            e.target.style.color = "#dc2626";
                          }}
                          onClick={() =>
                            deleteHandler(user._id, user.name)
                          }
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </Table>
          </motion.div>
        )}
      </Container>
    </motion.div>
  );
};

export default UserListView;
