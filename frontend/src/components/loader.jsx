import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "rgba(255, 255, 255, 0.7)", // soft overlay
        backdropFilter: "blur(4px)", // modern blur effect
        zIndex: 9999,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "90px",
          height: "90px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Outer Glow Ring */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "6px solid rgba(37, 99, 235, 0.2)",
            borderTop: "6px solid #2563eb", // vibrant blue
            animation: "spin 1s linear infinite",
          }}
        ></div>

        {/* Inner Spinner */}
        <Spinner
          animation="border"
          variant="primary"
          role="status"
          style={{
            width: "60px",
            height: "60px",
            borderWidth: "5px",
            color: "#2563eb",
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>

      <p
        style={{
          marginTop: "20px",
          fontSize: "1.1rem",
          color: "#1e3a8a",
          fontWeight: "500",
          letterSpacing: "0.5px",
        }}
      >
        Loading<span className="dots">...</span>
      </p>

      {/* CSS Animation Inline */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .dots::after {
            content: '';
            display: inline-block;
            width: 1em;
            animation: dots 1s steps(5, end) infinite;
          }
          @keyframes dots {
            0%, 20% { content: ''; }
            40% { content: '.'; }
            60% { content: '..'; }
            80%, 100% { content: '...'; }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
