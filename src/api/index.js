import axios from 'axios'
// axios.defaults.baseURL = 'http://xiefeng.xyz:3000'
axios.defaults.baseURL = 'http://localhost:3000'
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
  // 获取歌单详情
  getPlaylistDetail (id) {
    return axios('/playlist/detail?id=' + id, {
      withCredentials: true
    })
  },
  getMusicUrl (id) {
    return axios('/song/url?id=' + id)
  },
  // 获取音乐详情
  getMusicDetail (id) {
    return axios('/song/detail?ids=' + id)
  },
  // 检擦音乐是否可用
  checkMusic (id) {
    return axios('/check/music?id=' + id)
  },
  // 获取首页 banner
  getBanner () {
    return axios('/banner')
  },
  // 获取每日推荐的歌单
  getRecPlayList (limit = 30) {
    return axios('/personalized?limit=' + limit)
  },
  // 获取排行榜
  getToplist () {
    return axios('/toplist')
  },
  // 获取每日推荐的音乐
  getDailySongs () {
    return axios('/recommend/songs', {
      withCredentials: true
    })
  },
  // 获取歌手分类列表
  getSingerList (type = -1, area = -1, initial = -1, offset = 0, limit = 24) {
    return axios(`/artist/list?type=${type}&area=${area}&initial=${initial}&limit=${limit}&offset=${offset}`)
  },
  // 新歌速递
  getNewSongs (type = 0) {
    return axios('/top/song?type=' + type)
  },
  // 热搜
  getHotSearch () {
    return axios('/search/hot/detail')
  },
  // 搜索建议
  getSearchSuggestions (keywords) {
    return axios('/search/suggest?type=mobile&keywords=' + keywords)
  },
  // 获取搜索结果
  getSearchRes (keywords, offset = 0, limit = 30, type = 1) {
    return axios(`/search?keywords=${keywords}&offset=${offset}&limit=${limit}&type=${type}`)
  },
  // 热门歌单分类
  getHotPlaylist () {
    return axios('/playlist/hot')
  },
  // 歌单分类
  getPlaylistCatlist () {
    return axios('/playlist/catlist')
  },
  // 获取精品歌单
  getPlaylistContent (cat, before, limit = 30) {
    return axios(`/top/playlist/highquality?cat=${cat}&before=${before}&limit=${limit}`)
  }
}

export default api
