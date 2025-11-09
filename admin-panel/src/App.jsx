import React, { useState } from "react";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";

const App = () => {
  const [reload, setReload] = useState(false);

  return (
    <div className="App" style={{ padding: "30px", fontFamily: "sans-serif" }}>
      <h1>🧑‍💻 Admin Panel</h1>
      <CreatePost onCreated={() => setReload(!reload)} />
      <hr />
      <PostList reload={reload} />
    </div>
  );
};

export default App;
