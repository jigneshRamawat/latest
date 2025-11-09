import React, { useEffect, useState } from "react";
import API from "../api";
import EditPost from "./EditPost";

const PostList = ({ reload }) => {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, [reload]);

  const fetchPosts = async () => {
    const res = await API.get("/posts");
    setPosts(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await API.delete(`/posts/${id}`);
      fetchPosts();
    }
  };

  return (
    <div>
      <h2>All Posts</h2>
      {editPost ? (
        <EditPost post={editPost} onDone={() => { setEditPost(null); fetchPosts(); }} />
      ) : (
        <div>
          {posts.map((p) => (
            <div
              key={p._id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "8px",
              }}
            >
              <h3>{p.title}</h3>
              <img
                src={`http://localhost:3000/${p.image}`}
                alt="post"
                width="200"
              />
              <p>{p.paragraph1}</p>
              <p>{p.paragraph2}</p>
              <button onClick={() => setEditPost(p)}>✏️ Edit</button>
              <button onClick={() => handleDelete(p._id)}>🗑️ Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
