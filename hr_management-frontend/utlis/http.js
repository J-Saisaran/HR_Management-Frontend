import axios from "axios";

const instance = axios.create({
  //baseURL: "http://localhost:5000/api",
  baseURL:"https://hr-management-backend-rgrl.onrender.com/api"
 // timeout: 1000,
});

export default instance;