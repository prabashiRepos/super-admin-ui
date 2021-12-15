import axios from "axios"
import accessToken from "./jwt-token-access/accessToken"

//pass new generated access token here
const getToken = () => {
  return JSON.parse(localStorage.getItem('authUser'))
}

//apply base url for axios
const API_URL = "https://api.smartht.co.uk/api"

const axiosApi = axios.create({
  baseURL: API_URL,
})

// axiosApi.defaults.headers.common["Authorization"] = getToken()

axiosApi.interceptors.request.use(
  async config => {
    config.headers = {
      'Authorization': getToken(),
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

axiosApi.interceptors.response.use(
  response => response,
  error => {
    const { response } = error
    if (response?.status == 500 && response?.data?.message == "Unauthenticated.") {
      localStorage.removeItem('LOCAL_STORE_TOKEN');
      window.location.href = '/login';
    }
    return Promise.reject(error)
  }
)

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config })
    .then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function patch(url, data, config = {}) {
  return axiosApi
    .patch(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}
