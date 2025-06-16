import axios from "axios";

const API = axios.create({
  baseURL: "https://subpf-1.onrender.com/api", // change if different
  withCredentials: true,
});

export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);
