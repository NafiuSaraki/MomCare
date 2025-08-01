import axios from "axios";

const instance = axios.create({
  baseURL: "https://uwalafiya-backend.onrender.com",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;