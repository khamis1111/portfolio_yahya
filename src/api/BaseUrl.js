import axios from "axios";
export const urlWeb = "http://127.0.0.1:8080";
// export const urlWeb = "https://portfolio-yaya-backend.vercel.app";
const baseUrl = axios.create({ baseURL: urlWeb });

export default baseUrl;
