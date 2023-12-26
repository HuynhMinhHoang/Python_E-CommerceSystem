import axios from "axios";

const SERVER_CONTEXT = "/accounts";
const SERVER = "http://127.0.0.1:8000";

export const endpoints = {
  login: `${SERVER_CONTEXT}/login/`,
};

export const authApi = (token) => {
  return axios.create({
    baseURL: SERVER,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default axios.create({
  baseURL: SERVER,
});
