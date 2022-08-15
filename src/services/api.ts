import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

console.log({ baseURL });

const apiService = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiService;
