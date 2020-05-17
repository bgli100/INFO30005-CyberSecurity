import React from "react";
import PropTypes from "prop-types";

const ForumItem = ({ post, markReaded, deleteItem }) => {
  const itemStyle = {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    borderBottom: "1px #ccc dotted",
    textDecoration: post.completed ? "line-through" : "none",
  };
  return (
    <div style={itemStyle}>
      <p>
        <input
          type='checkbox'
          checked={post.completed}
          onChange={() => markReaded(post.id)}
          value={post.completed}
        />
        {"   "}
        {post.title}
        <button style={btnStyle} onClick={() => deleteItem(post.id)}>
          Skip
        </button>
      </p>
    </div>
  );
};

const btnStyle = {
  backgroundColor: "ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
  float: "right",
  borderRadius: "50%",
};
ForumItem.prototypes = {
  post: PropTypes.object.isRequired,
  markReaded: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};
export default ForumItem;
