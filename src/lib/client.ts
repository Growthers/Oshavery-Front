import axios, { AxiosInstance } from "axios";

export const client: AxiosInstance = axios.create({
  baseURL: "",
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'
})
