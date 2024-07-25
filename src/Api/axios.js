import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/clone-f6bc7/us-central1/api"
  baseURL: "https://amazone-api-deploy-2s2e.onrender.com",
});
export {axiosInstance};
