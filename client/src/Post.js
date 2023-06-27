import React from "react";
import { formatISO9075, format } from "date-fns";

const Post = ({ title, summary, cover, content, createdAt, author }) => {
  return (
    <div className="post">
      <div className="post-container">
        <img
          src="https://images.unsplash.com/photo-1550399504-8953e1a6ac87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1329&q=80"
          alt=""
        />
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
