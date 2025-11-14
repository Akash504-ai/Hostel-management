import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant = "info", children }) => {
  return (
    <Alert
      variant={variant}
      dismissible
      className="text-center"
      style={{ maxWidth: "600px", margin: "10px auto" }}
    >
      {children}
    </Alert>
  );
};

export default Message;
