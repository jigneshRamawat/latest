import React, { useState } from "react";
import API from "../api";

const EditPost = ({ post, onDone }) => {
  const [title, setTitle] = useState(post.title);
  const [paragraph1, setParagraph1] = useState(post.paragraph1);
  const [paragraph2, setParagraph2] = useState(post.paragraph2);
  const [image, setImage] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("paragraph1", paragraph1);
      formData.append("paragraph2", paragraph2);
      if (image) formData.append("image", image);

      await API.put(`/posts/${post._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Post updated ✅");
      onDone();
    } catch (error) {
      console.error(error);
      alert("Failed to update post ❌");
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br />
        <textarea
          value={paragraph1}
          onChange={(e) => setParagraph1(e.target.value)}
          required
        /><br />
        <textarea
          value={paragraph2}
          onChange={(e) => setParagraph2(e.target.value)}
        /><br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        /><br />
        <button type="submit">Update</button>
        <button type="button" onClick={onDone}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditPost;
