import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form
      onSubmit={submitHandler}
      className="d-flex align-items-center my-2 my-lg-0"
      role="search"
      style={{
        backgroundColor: "#f1f3f4",
        borderRadius: "25px",
        overflow: "hidden",
        padding: "2px",
        height: "40px",
      }}
    >
      <Form.Control
        type="text"
        value={keyword}
        name="q"
        placeholder="Search students..."
        className="me-2 ms-lg-3"
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          border: "none",
          outline: "none",
          boxShadow: "none",
          backgroundColor: "transparent",
          fontSize: "0.95rem",
        }}
      />

      <Button
        type="submit"
        variant="success"
        className="px-3"
        style={{
          borderRadius: "25px",
          width: "70px",
          // paddingRight: "5px",
          backgroundColor: "#2563eb",
          border: "none",
          color: "#fff",
          fontWeight: "500",
          transition: "0.2s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#1e40af")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
      >
        🔍
      </Button>
    </Form>
  );
};

export default SearchBox;
