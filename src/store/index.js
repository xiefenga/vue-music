import Vue from 'vue'
import Vuex from 'vuex'
import { ON_LINE, OFF_LINE, PLAY, PAUSE, SET_MUSIC, PUT_TRACKS, ADD_MUSIC, NEXT_MUSIC, SET_INDEX } from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    online: false,
    playing: false,
    curMusic: {
      id: null,
      name: null,
      al: {
        name: null,
        picUrl: null
      },
      ar: []
    },
    musicList: [],
    mode: '',
    curMusicIndex: 0
  },
  mutations: {
    [ON_LINE] (state) {
      state.online = true
    },
    [OFF_LINE] (state) {
      state.online = false
    },
    [PLAY] (state) {
      state.playing = true
    },
    [PAUSE] (state) {
      state.playing = false
    },
    [SET_MUSIC] (state, info) {
      state.curMusic = info
    },
    [PUT_TRACKS] (state, list) {
      state.musicList = list
      state.curMusic = list[0]
      state.curMusicIndex = 0
      window.localStorage.setItem('musicList', JSON.stringify(state.musicList))
      window.localStorage.setItem('musicIndex', 0)
    },
    [ADD_MUSIC] (state, info) {
      const { id } = info
      const len = state.musicList.length
      let index = -1
      for (let i = 0; i < len; i++) {
        if (id === state.musicList[i].id) {
          index = i
          break
        }
      }
      if (index === -1) {
        state.musicList.unshift(info)
        state.curMusicIndex = 0
        window.localStorage.setItem('musicList', JSON.stringify(state.musicList))
      } else {
        state.curMusicIndex = index
      }
      state.curMusic = info
      window.localStorage.setItem('musicIndex', state.curMusicIndex)
    },
    [NEXT_MUSIC] (state, offset = 1) {
      state.playing = false
      if (offset < 0 && state.curMusicIndex === 0) {
        state.curMusicIndex = state.musicList.length - 1
      } else if (offset > 0 && state.curMusicIndex === state.musicList.length - 1) {
        state.curMusicIndex = 0
      } else {
        state.curMusicIndex += offset
      }
      window.localStorage.setItem('musicIndex', state.curMusicIndex)
      state.curMusic = state.musicList[state.curMusicIndex]
      state.playing = true
    },
    [SET_INDEX] (state, index) {
      state.curMusicIndex = index
      state.curMusic = state.musicList[index]
    }
  },
  actions: {
  },
  modules: {
  }
})
