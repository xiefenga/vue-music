import axios from 'axios'
// axios.defaults.baseURL = 'http://xiefeng.xyz:3000'
axios.defaults.baseURL = 'http://localhost:3000'
// axios.defaults.headers.withCredentials = true // 因为 使用 get请求所以不需要，反而会出错
axios.interceptors.response.use(response => response.data)
const api = {
  login (phone, password) {
    return axios.get(`/login/cellphone?phone=${phone}&password=${password}`)
  },
  getUserDetail (uid) {
    return axios.get(`/user/detail?uid=${uid}`)
  },
  getLoginStatus () {
    return axios.get('/login/status', {
      withCredentials: true
    })
  },
  getPlaylists (uid) {
    return axios.get(`/user/playlist?uid=${uid}`)
  },
  logout () {
    return axios.get('/logout')
  },
  getHomePage (refresh = false) {
    return axios('/homepage/block/page?refresh' + refresh)
  },
  getPlaylistDetail (id) {
    return axios('/playlist/detail?id=' + id, {
      withCredentials: true
    })
  }
}

export default api
