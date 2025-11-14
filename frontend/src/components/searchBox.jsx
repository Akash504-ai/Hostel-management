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
      role="search"
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f1f5f9",
        borderRadius: "30px",
        padding: "4px 10px",
        height: "40px",
        width: "100%",       // 👈 full flexible width inside wrapper
      }}
    >
      <Form.Control
        type="text"
        value={keyword}
        name="q"
        placeholder="Search students..."
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          border: "none",
          outline: "none",
          boxShadow: "none",
          backgroundColor: "transparent",
          fontSize: "0.95rem",
          paddingLeft: "8px",
          flex: 1,
        }}
      />

      <Button
        type="submit"
        style={{
          height: "32px",
          width: "32px",
          borderRadius: "35%",   // 👈 perfect circle
          backgroundColor: "#2563eb",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          cursor: "pointer",
          transition: "all 0.2s ease",
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
