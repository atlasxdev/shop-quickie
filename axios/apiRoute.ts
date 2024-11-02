import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_ROUTE as string;

export const apiRoute = axios.create({
  baseURL,
});
