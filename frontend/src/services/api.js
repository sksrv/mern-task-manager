import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-task-manager-backend-rcww.onrender.com/api",
});

export default API;
