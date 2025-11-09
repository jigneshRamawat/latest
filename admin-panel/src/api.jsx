import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // backend ka base URL
});

export default API;
