import React from "react";
import ForumItem from "./forumItem";
import PropTypes from "prop-types";

const forumList = ({ post, markReaded, deleteItem }) => {
  return (
    <div>
      {post
        .sort((a, b) => a.readState - b.readState)
        .map((post) => {
          return (
            <ForumItem
              markReaded={markReaded}
              deleteItem={deleteItem}
              post={post}
            />
          );
        })}
    </div>
  );
};

forumList.prototypes = {
  post: PropTypes.array.isRequired,
  markReaded: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};
export default forumList;
