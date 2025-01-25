// src/axiosInstance.js
import axios from "axios";

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Replace with your backend API URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
