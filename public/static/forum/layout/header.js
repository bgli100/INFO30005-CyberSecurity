import React from "react";
import { Link } from "react-router-dom";

const header = () => {
  return (
    <header style={headerStyle}>
      <h1>Cyberium</h1>
      <Link style={linkStyle} to='/about'>
        {" "}
        Main
      </Link>
      {"    "}/{"    "}
      <Link style={linkStyle} to='/'>
        Forum{" "}
      </Link>
    </header>
  );
};

const headerStyle = {
  background: "#333",
  color: "#fff",
  textAlign: "center",
  padding: "15px",
};
const linkStyle = {
  color: "#fff",
  textDecoration: "none",
};
export default header;
