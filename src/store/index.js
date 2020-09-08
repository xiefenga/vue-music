import Vue from 'vue'
import Vuex from 'vuex'
import { SET_UID, SET_NICKNAME, SET_AVARTAR, SET_BACKGROUND } from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    user: {
      uid: '',
      nickname: '',
      backgroundUrl: '',
      avatarUrl: ''
    }
  },
  mutations: {
    [SET_UID] (state, uid) {
      state.user.uid = uid
    },
    [SET_NICKNAME] (state, nickname) {
      state.user.nickname = nickname
    },
    [SET_AVARTAR] (state, avatarUrl) {
      state.user.avatarUrl = avatarUrl
    },
    [SET_BACKGROUND] (state, backgroundUrl) {
      state.user.backgroundUrl = backgroundUrl
    }
  },
  actions: {
  },
  modules: {
  }
})
