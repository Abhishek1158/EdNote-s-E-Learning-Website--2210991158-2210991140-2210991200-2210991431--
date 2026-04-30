import axios from "axios";
const API = axios.create({    // reusable version api ; common base-url for all req
  baseURL: "http://localhost:5001/api",
  headers: { "Content-Type": "application/json", },
});
// work before req is sent to add token centralized authentication
API.interceptors.request.use(
  // configuration of the request like url , methods before sending req
  (config) => {
    // attaching token fron local-storage to very api
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  }, (error) => Promise.reject(error)
);
// (fn)work after every response is received for token 
API.interceptors.response.use(
  (response) => response,   // response status if req proceed 
  (error) => {        
    if (error.response?.status === 401) {    // error of token invalid or expired
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);     // passing error to api
  }
);
export default API;