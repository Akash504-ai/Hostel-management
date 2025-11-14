import React from "react";
import { Card, Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Student = ({ studentDetails: student }) => {
  if (!student) {
    return (
      <Card className="my-3 p-3 rounded text-center text-muted shadow-sm">
        <small>Loading student...</small>
      </Card>
    );
  }

  return (
    <Card
      className="my-3 shadow-lg border-0"
      style={{
        borderRadius: "18px",
        overflow: "hidden",
        background: "linear-gradient(145deg, #f8fafc, #eef2ff)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 12px 20px rgba(0, 0, 0, 0.1)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.08)";
      }}
    >
      {/* Student Image */}
      <Link to={`/student/${student._id || ""}`}>
        <div
          style={{
            width: "100%",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#e2e8f0", // ✅ soft background for empty space
            borderTopLeftRadius: "18px",
            borderTopRightRadius: "18px",
            overflow: "hidden",
          }}
        >
          <Image
            src={student.image || "/images/default-profile.png"}
            alt={student.name || "Student"}
            fluid
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain", // ✅ shows entire image (no cropping)
              objectPosition: "center",
              transition: "transform 0.3s ease",
              borderRadius: "6px",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
      </Link>

      {/* Student Info */}
      <Card.Body
        style={{
          textAlign: "center",
          padding: "15px 12px 18px 12px",
        }}
      >
        <Link
          to={`/student/${student._id || ""}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card.Title
            as="div"
            style={{
              fontWeight: "600",
              fontSize: "1.2rem",
              color: "#1e293b",
              marginBottom: "6px",
            }}
          >
            {student.name || "Unnamed Student"}
          </Card.Title>
        </Link>

        <div style={{ color: "#475569", fontSize: "0.9rem", marginBottom: "5px" }}>
          🏠 Room No: <strong>{student.roomNo || "N/A"}</strong>
        </div>
        <div style={{ color: "#475569", fontSize: "0.9rem" }}>
          🎓 Stream: <strong>{student.category || "N/A"}</strong>
        </div>

        <hr style={{ margin: "10px 0", opacity: 0.15 }} />

        <Card.Text style={{ margin: 0, color: "#1e293b", fontSize: "0.95rem" }}>
          📞 <strong>Contact:</strong>{" "}
          {student.contact ? (
            <a
              href={`tel:${student.contact}`}
              style={{
                textDecoration: "none",
                color: "#2563eb",
                fontWeight: "500",
              }}
            >
              {student.contact}
            </a>
          ) : (
            "N/A"
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Student;
