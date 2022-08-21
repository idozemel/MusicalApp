import React from "react";
import { Alert } from "react-bootstrap";
import "./ErrorMessage.css";

const ErrorMessage = ({ variant = "info", children, className }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 20 }} className={className}>
      <strong>{children}</strong>
      {console.log()}
    </Alert>
  );
};

export default ErrorMessage;
