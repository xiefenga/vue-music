import axios from 'axios'
// axios.defaults.baseURL = 'http://xiefeng.xyz:3000'
axios.defaults.baseURL = 'http://localhost:3000'
// axios.defaults.headers.withCredentials = true  因为 使用 get请求所以不需要，反而会出错
axios.interceptors.response.use(response => response.data)
const api = {
  login (phone, password) {
    return axios.get(`/login/cellphone?phone=${phone}&password=${password}`)
  },
  getUserDetail (uid) {
    return axios.get(`/user/detail?uid=${uid}`)
  },
  getLoginStatus () {
    return axios.get('/login/status')
  },
  getPlaylists (uid) {
    return axios.get(`/user/playlist?uid=${uid}`)
  }
}

export default api
