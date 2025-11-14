import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/message";
import Loader from "../components/loader";
import FormContainer from "../components/formContainer";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditView = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/userList");
    } else {
      if (!user || !user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, navigate, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link
        to="/userList"
        className="btn btn-light my-3"
        style={{
          padding: "8px 16px",
          borderRadius: "6px",
          background: "#f1f1f1",
          border: "1px solid #ddd",
        }}
      >
        Go Back
      </Link>

      <FormContainer>
        <Card
          style={{
            padding: "30px",
            border: "none",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            borderRadius: "12px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontWeight: "600",
            }}
          >
            Edit User
          </h2>

          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label style={{ fontWeight: "500" }}>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label style={{ fontWeight: "500" }}>
                  Email Address
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </Form.Group>

              <Form.Group controlId="isadmin" className="mb-4">
                <Form.Check
                  type="checkbox"
                  label="Is Admin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  style={{ fontWeight: "500" }}
                />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="w-100"
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  backgroundColor: "#007bff",
                  border: "none",
                }}
              >
                Update User
              </Button>
            </Form>
          )}
        </Card>
      </FormContainer>
    </>
  );
};

export default UserEditView;
