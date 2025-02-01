import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3030",
    withCredentials: true,
    timeout: 1000,
});

export { axiosInstance };
