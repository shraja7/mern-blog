import React from "react";
import { formatISO9075, format } from "date-fns";

const Post = ({ title, summary, cover, content, createdAt, author }) => {
  return (
    <div className="post">
      <div className="post-container">
        <img src={`http://localhost:4000/${cover}`} alt="" />
        <div className="texts">
          <h2>{title}</h2>
          <p className="info">
            <a href="" className="author">
              {author.username}
            </a>
            <time>{formatISO9075(new Date(createdAt))}</time>
          </p>
          <p className="summary">{summary}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
