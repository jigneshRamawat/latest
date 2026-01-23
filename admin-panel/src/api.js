const API = "http://localhost:3000";

// ---------------- LOGIN ----------------
export async function loginUser(data) {
  return await fetch(`${API}/api/auth/user/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// ---------------- GET PROJECTS ----------------
export async function fetchProjects() {
  return await fetch(`${API}/api/project/all`, {
    method: "GET",
    credentials: "include",
  });
}

// ---------------- ADD PROJECT ----------------
export async function addProject(data) {
  return await fetch(`${API}/api/project/project`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
