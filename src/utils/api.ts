// TODO: consider moving this file to utils folder
import axios from "axios";

// allows you to reuse the same base settings, headers, or other options across multiple requests
const api = axios.create({
  baseURL: "http://localhost:8000/api", //TODO: what to do when prod env?
  withCredentials: true, //  to include cookies in the request
  // other options
});

export default api;
