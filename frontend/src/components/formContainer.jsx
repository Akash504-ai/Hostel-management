import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <div className="p-4 shadow-sm rounded bg-white">{children}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
