import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from '../config'


Vue.use(Vuex)

async function getAllData() {
  
  let List = []
  await axios.get(`${config.apiUrl}getWordList`).then(res => {
    List = res.data
  })
  return List
}



export default new Vuex.Store({
  state: {
    wordList: [],
    userName: ""

  },
  mutations: {
    SET_WORD_LIST(state, LIST) {
      state.wordList = LIST
    }
  },
  actions: {
    async getWordList() {

      this.commit("SET_WORD_LIST", await getAllData())
    }
  },
  modules: {
  }
})
