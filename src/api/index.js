import axios from 'axios'
axios.defaults.baseURL = 'http://xiefeng.xyz:3000'
axios.defaults.headers.withCredentials = true
axios.interceptors.response.use(response => response.data)
const api = {
  login (phone, password) {
    return axios.get(`/login/cellphone?phone=${phone}&password=${password}`)
  }
}

export default api
