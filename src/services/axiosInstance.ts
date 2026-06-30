import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MOCKAPI_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const postsApiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MOCKAPI_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
