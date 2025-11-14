import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#0f172a",
        color: "#e2e8f0",
        paddingTop: "30px",
        marginTop: "50px",
      }}
    >
      <Container>
        <Row className="text-center text-md-start">
          {/* About Section */}
          <Col md={4} className="mb-4">
            <h5 style={{ color: "#60a5fa", fontWeight: "600" }}>HostelHub</h5>
            <p style={{ fontSize: "0.9rem", marginTop: "10px", color: "#cbd5e1" }}>
              HostelHub is an all-in-one online hostel management system designed to make
              student accommodation management simple, efficient, and stress-free.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-4">
            <h6 style={{ color: "#60a5fa", fontWeight: "600" }}>Quick Links</h6>
            <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
              <li style={{ marginBottom: "6px" }}>
                <a href="/" style={{ color: "#cbd5e1", textDecoration: "none" }}>
                  Home
                </a>
              </li>
              <li style={{ marginBottom: "6px" }}>
                <a href="/about" style={{ color: "#cbd5e1", textDecoration: "none" }}>
                  About
                </a>
              </li>
              <li style={{ marginBottom: "6px" }}>
                <a href="/contact" style={{ color: "#cbd5e1", textDecoration: "none" }}>
                  Contact
                </a>
              </li>
              <li style={{ marginBottom: "6px" }}>
                <a href="/login" style={{ color: "#cbd5e1", textDecoration: "none" }}>
                  Login
                </a>
              </li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={4} className="mb-4">
            <h6 style={{ color: "#60a5fa", fontWeight: "600" }}>Contact</h6>
            <p style={{ marginTop: "10px", color: "#cbd5e1", fontSize: "0.9rem" }}>
              📍 HostelHub HQ, TechCity, India <br />
              📞 +91 98765 43210 <br />
              📧 support@hostelhub.com
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "10px" }}>
              <a href="#" style={{ color: "#60a5fa", fontSize: "1.2rem" }}>
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" style={{ color: "#60a5fa", fontSize: "1.2rem" }}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" style={{ color: "#60a5fa", fontSize: "1.2rem" }}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" style={{ color: "#60a5fa", fontSize: "1.2rem" }}>
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </Col>
        </Row>

        <hr style={{ borderColor: "#1e293b" }} />

        <Row>
          <Col className="text-center" style={{ paddingBottom: "10px" }}>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.9rem" }}>
              © {currentYear} <strong>HostelHub</strong>. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
