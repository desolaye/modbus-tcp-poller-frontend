import axios from "axios";

const ENV_URL = import.meta.env.VITE_PUBLIC_API_URL;

export const apiInstance = axios.create({
  baseURL: ENV_URL,
});
