import React from "react";

const Post = () => {
  return (
    <div className="post">
      <div className="post-container">
        <img
          src="https://images.unsplash.com/photo-1550399504-8953e1a6ac87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1329&q=80"
          alt=""
        />
        <div className="texts">
          <h2>Going on a vacation you won't forget</h2>
          <p className="info">
            <a href="" className="author">
              John Doe
            </a>
            <time>May 14, 2021</time>
          </p>
          <p className="summary">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi enim
            perferendis numquam cumque natus sequi, impedit beatae optio at
            voluptatum nobis maxime quia quaerat facere quisquam, ex, harum qui
            amet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
