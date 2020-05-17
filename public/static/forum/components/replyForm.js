/*import React, { useState } from "react";
import PropTypes from "prop-types";

const formStyle = {
  display: "flex",
};

const replyForm = ({ addItem }) => {
  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  };
  const submitIt = (e) => {
    e.preventDefault();
    addItem(text);
    setText("");
  };
  return (
    <form onSubmit={submitIt} style={formStyle}>
      <input
        type='text'
        value={text}
        onChange={onChange}
        style={{ flex: "10", padding: "5px" }}
      />
      <input type='Submit' value='Post' style={{ flex: "1" }} />
    </form>
  );
};

replyForm.protoTypes = {
  addItem: PropTypes.func.isRequired,
};

export default replyForm;*/
