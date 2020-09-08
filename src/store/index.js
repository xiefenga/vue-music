import Vue from 'vue'
import Vuex from 'vuex'
import { SET_UID, SET_NICKNAME } from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    uid: '',
    nickname: ''
  },
  mutations: {
    [SET_UID] (state, uid) {
      state.uid = uid
    },
    [SET_NICKNAME] (state, nickname) {
      state.nickname = nickname
    }
  },
  actions: {
  },
  modules: {
  }
})
