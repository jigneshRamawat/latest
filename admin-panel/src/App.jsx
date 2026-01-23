import React, { useState, useEffect } from "react";

// ---------------- API ----------------
const API = "https://latest-9qs4.onrender.com";

async function loginUser(data) {
  return await fetch(`${API}/api/auth/user/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

async function fetchProjects() {
  return await fetch(`${API}/api/project/all`, {
    method: "GET",
    credentials: "include",
  });
}

async function addProject(formData) {
  return await fetch(`${API}/api/project/project`, {
    method: "POST",
    credentials: "include",
    body: formData, // FormData for file upload
  });
}

async function deleteProjectById(id) {
  return await fetch(`${API}/api/project/project/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
}

// ---------------- APP ----------------
function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    dec: "",
    link: "",
    file: null,
  });

  // -------- LOGIN --------
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      const data = await res.json();

      if (res.ok) {
        setIsLogged(true);
        loadProjects();
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  }

  // -------- LOAD PROJECTS --------
  async function loadProjects() {
    try {
      const res = await fetchProjects();
      const data = await res.json();

      if (Array.isArray(data.projectitem)) {
        setProjects(data.projectitem);
      } else {
        console.error("projectitem is not array:", data);
        setProjects([]);
      }
    } catch (err) {
      console.error("Fetch projects error:", err);
      setProjects([]);
    }
  }

  // -------- ADD PROJECT --------
  async function handleAddProject(e) {
    e.preventDefault();

    if (!newProject.file) {
      alert("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("title", newProject.title);
    formData.append("dec", newProject.dec);
    formData.append("link", newProject.link);
    formData.append("image", newProject.file);

    try {
      const res = await addProject(formData);
      const data = await res.json();

      if (res.ok) {
        setNewProject({ title: "", dec: "", link: "", file: null });
        loadProjects(); // Refresh list
      } else {
        alert(data.message || "Failed to add project");
      }
    } catch (err) {
      console.error("Add project error:", err);
    }
  }

  // -------- DELETE PROJECT --------
  async function handleDeleteProject(id) {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await deleteProjectById(id);
      const data = await res.json();

      if (res.ok) {
        loadProjects(); // Refresh list
      } else {
        alert(data.message || "Failed to delete project");
      }
    } catch (err) {
      console.error("Delete project error:", err);
    }
  }

  // ----------------- UdwI -----------------
  if (!isLogged) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin} style={{ marginTop: "25px" }}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{ padding: "10px", margin: "5px", width: "250px" }}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={{ padding: "10px", margin: "5px", width: "250px" }}
          />
          <br />
          <button style={{ padding: "10px 20px", marginTop: "10px" }}>
            Login
          </button>
        </form>
      </div>
    );
  }

  // ----------------- ADMIN DASHBOARD -----------------
  return (
    <div style={{ padding: "30px" }}>
      <h2>Admin Dashboard</h2>

      <h3>Add New Project</h3>
      <form onSubmit={handleAddProject} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Title"
          value={newProject.title}
          onChange={(e) =>
            setNewProject({ ...newProject, title: e.target.value })
          }
          style={{ padding: "8px", marginRight: "10px" }}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newProject.dec}
          onChange={(e) =>
            setNewProject({ ...newProject, dec: e.target.value })
          }
          style={{ padding: "8px", marginRight: "10px" }}
          required
        />
        <input
          type="text"
          placeholder="Link"
          value={newProject.link}
          onChange={(e) =>
            setNewProject({ ...newProject, link: e.target.value })
          }
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <input
          type="file"
          onChange={(e) =>
            setNewProject({ ...newProject, file: e.target.files[0] })
          }
          style={{ marginRight: "10px" }}
          required
        />
        <button style={{ padding: "8px 15px" }}>Add Project</button>
      </form>

      <h3>All Projects</h3>
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Link</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((p) => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.dec}</td>
                <td>
                  <a href={p.link} target="_blank" rel="noreferrer">
                    {p.link}
                  </a>
                </td>
                <td>
                  <img
                    src={p.img}
                    alt={p.title}
                    style={{ width: "80px", height: "50px", objectFit: "cover" }}
                  />
                </td>
                <td>
                  <button
                    style={{ padding: "5px 10px", color: "white", background: "red", border: "none", cursor: "pointer" }}
                    onClick={() => handleDeleteProject(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No projects found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
