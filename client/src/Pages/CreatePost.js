import React from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CreatePost.css"; // Import the CSS file with the styles

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  return (
    <form className="create-post-form">
      <input className="input-field" type="text" placeholder="Title" />
      <input className="input-field" type="summary" placeholder="Summary" />
      <input className="input-field" type="file" />
      <ReactQuill
        className="input-field"
        value={content}
        modules={modules}
        formats={formats}
      />
      <button className="create-post-button">Create Post</button>
    </form>
  );
};

export default CreatePost;
