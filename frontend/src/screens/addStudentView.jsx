import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../components/formContainer";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, updateStudent } from "../actions/studentActions";
import Loader from "../components/loader";
import Message from "../components/message";
import { STUDENT_UPDATE_RESET } from "../constants/studentConstant";

const AddStudentView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");
  const [fatherContact, setFatherContact] = useState("");
  const [image, setImage] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [blockNo, setBlockNo] = useState("");
  const [status, setStatus] = useState("Hostel");

  const studentAdd = useSelector((state) => state.studentAdd);
  const { loading, error, success } = studentAdd;

  const studentUpdate = useSelector((state) => state.studentUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = studentUpdate;

  useEffect(() => {
    // Redirect on update success
    if (successUpdate) {
      dispatch({ type: STUDENT_UPDATE_RESET });
      navigate("/");
    }

    // Check if editing an existing student
    const student = location.state?.studentProps;
    if (student) {
      setIsEdit(true);
      setName(student.name);
      setAddress(student.address);
      setCategory(student.category);
      setCity(student.city);
      setContact(student.contact);
      setFatherContact(student.fatherContact);
      setImage(student.image);
      setRoomNo(student.roomNo);
      setBlockNo(student.blockNo);
      setStatus(student.status);
    }

    // Redirect on add success
    if (success) {
      navigate("/");
    }
  }, [dispatch, navigate, location.state, success, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (isEdit) {
      const _id = location.state?.studentProps._id;
      dispatch(
        updateStudent({
          _id,
          name,
          address,
          category,
          city,
          contact,
          fatherContact,
          image,
          roomNo,
          blockNo,
          status,
        })
      );
    } else {
      dispatch(
        addStudent({
          name,
          address,
          category,
          city,
          contact,
          fatherContact,
          image,
          roomNo,
          blockNo,
          status,
        })
      );
    }
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      {loading || loadingUpdate ? (
        <Loader />
      ) : (
        <FormContainer>
          <h1>{isEdit ? "Edit Student" : "Add Student"}</h1>

          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {error && <Message variant="danger">{error}</Message>}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="status" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {["Hostel", "Outside", "Home"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="address" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="city" className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="contact" className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter phone number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="fatherContact" className="mb-3">
              <Form.Label>Father's Contact</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter father's phone number"
                value={fatherContact}
                onChange={(e) => setFatherContact(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="roomNo" className="mb-3">
              <Form.Label>Room Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter room number"
                value={roomNo}
                onChange={(e) => setRoomNo(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="blockNo" className="mb-3">
              <Form.Label>Block Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter block number"
                value={blockNo}
                onChange={(e) => setBlockNo(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="category" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter stream/category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100 mt-3">
              {isEdit ? "Update Student" : "Add Student"}
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default AddStudentView;
