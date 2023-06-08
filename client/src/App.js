import "./App.css";
import Post from "./Post";
import Header from "./Header";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Post />} />
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/register" element={<div>Register</div>} />
      </Route>
    </Routes>
  );
}

export default App;
