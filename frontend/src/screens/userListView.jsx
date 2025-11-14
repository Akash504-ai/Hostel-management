import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "../components/message";
import Loader from "../components/loader";
import { listUsers, deleteUser } from "../actions/userActions";

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
    <Container className="py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">User Management</h2>
        <small className="text-muted">
          Manage registered users and admin roles
        </small>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : users.length === 0 ? (
        <Message variant="info">No users found.</Message>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className="table-sm align-middle shadow-sm"
        >
          <thead className="table-dark text-center">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="text-muted">{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`} className="text-decoration-none">
                    {user.email}
                  </a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <span className="badge bg-success">Admin</span>
                  ) : (
                    <span className="badge bg-secondary">User</span>
                  )}
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <LinkContainer to={`/user/${user._id}/edit`}>
                      <Button
                        variant="outline-primary"
                        className="btn-sm"
                        title="Edit User"
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="outline-danger"
                      className="btn-sm"
                      title="Delete User"
                      onClick={() => deleteHandler(user._id, user.name)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserListView;
