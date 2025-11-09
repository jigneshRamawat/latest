import React, { useState } from "react";
import API from "../api";

const CreatePost = ({ onCreated }) => {
  const [title, setTitle] = useState("");
  const [paragraph1, setParagraph1] = useState("");
  const [paragraph2, setParagraph2] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("paragraph1", paragraph1);
      formData.append("paragraph2", paragraph2);
      formData.append("image", image);

      await API.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Post created successfully ✅");
      setTitle("");
      setParagraph1("");
      setParagraph2("");
      setImage(null);
      onCreated();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create post ❌");
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br />
        <textarea
          placeholder="Paragraph 1"
          value={paragraph1}
          onChange={(e) => setParagraph1(e.target.value)}
          required
        /><br />
        <textarea
          placeholder="Paragraph 2"
          value={paragraph2}
          onChange={(e) => setParagraph2(e.target.value)}
        /><br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        /><br />
        <button type="submit">Upload Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
