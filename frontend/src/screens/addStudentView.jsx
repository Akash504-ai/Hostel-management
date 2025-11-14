import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, updateStudent } from "../actions/studentActions";
import Loader from "../components/loader";
import Message from "../components/message";
import { STUDENT_UPDATE_RESET } from "../constants/studentConstant";
import { motion } from "framer-motion"; // ⭐ Added Motion

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
    if (successUpdate) {
      dispatch({ type: STUDENT_UPDATE_RESET });
      navigate("/");
    }

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

    if (success) {
      navigate("/");
    }
  }, [dispatch, navigate, location.state, success, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(
        updateStudent({
          _id: location.state?.studentProps._id,
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

  // Styles
  const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "0.95rem",
    width: "100%",
  };

  const labelStyle = {
    fontWeight: "600",
    marginBottom: "6px",
    color: "#334155",
  };

  const columnStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          to="/"
          style={{
            display: "inline-block",
            padding: "8px 14px",
            backgroundColor: "#e2e8f0",
            color: "#1e293b",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "600",
            marginBottom: "20px",
          }}
        >
          ⬅ Go Back
        </Link>
      </motion.div>

      {loading || loadingUpdate ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.75)",
              padding: "30px",
              borderRadius: "16px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              backdropFilter: "blur(6px)",
            }}
          >
            <h1
              style={{
                fontWeight: "700",
                textAlign: "center",
                marginBottom: "20px",
                color: "#0f172a",
              }}
            >
              {isEdit ? "Edit Student" : "Add Student"}
            </h1>

            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
            {error && <Message variant="danger">{error}</Message>}

            <Form onSubmit={submitHandler}>
              {/* Two Column Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                {/* LEFT COLUMN */}
                <div style={columnStyle}>
                  <Form.Group>
                    <Form.Label style={labelStyle}>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter name"
                      style={inputStyle}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label style={labelStyle}>City</Form.Label>
                    <Form.Control
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Enter city"
                      style={inputStyle}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label style={labelStyle}>Father's Contact</Form.Label>
                    <Form.Control
                      type="number"
                      value={fatherContact}
                      onChange={(e) => setFatherContact(e.target.value)}
                      placeholder="Enter father's number"
                      style={inputStyle}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label style={labelStyle}>Room No</Form.Label>
                    <Form.Control
                      type="text"
                      value={roomNo}
                      onChange={(e) => setRoomNo(e.target.value)}
                      placeholder="Enter room number"
                      style={inputStyle}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label style={labelStyle}>Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="Enter image URL"
                      style={inputStyle}
                    />
                  </Form.Group>
                </div>

                {/* RIGHT COLUMN */}
                <div style={columnStyle}>
                  <Form.Group>
                    <Form.Label style={labelStyle}>Status</Form.Label>
                    <Form.Control
                      as="select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      style={inputStyle}
                    >
                      <option>Hostel</option>
                      <option>Outside</option>
                      <option>Home</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label style={labelStyle}>Address</Form.Label>
                    <Form.Control
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter address"
                      style={inputStyle}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label style={labelStyle}>Contact</Form.Label>
                    <Form.Control
                      type="number"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="Enter contact"
                      style={inputStyle}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label style={labelStyle}>Block No</Form.Label>
                    <Form.Control
                      type="text"
                      value={blockNo}
                      onChange={(e) => setBlockNo(e.target.value)}
                      placeholder="Enter block number"
                      style={inputStyle}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label style={labelStyle}>Category / Stream</Form.Label>
                    <Form.Control
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Enter stream"
                      style={inputStyle}
                    />
                  </Form.Group>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: "#2563eb",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "1rem",
                  marginTop: "25px",
                  transition: "0.2s",
                }}
              >
                {isEdit ? "Update Student" : "Add Student"}
              </motion.button>
            </Form>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AddStudentView;
