import Vue from 'vue'
import Vuex from 'vuex'
import Tasks from '../tasks.json';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    totalCurrency: 0,
    tasks: {}
  },
  mutations: {
    setTotalCurrency(state, total){
      state.totalCurrency = total;
    },
    addCurrency(state, amount){
      state.totalCurrency = state.totalCurrency + amount;
    },
    subtractCurrency(state, amount){
      state.totalCurrency = state.totalCurrency - amount;
    },
    setTasks(state, tasks){
      state.tasks = tasks;
    }
  },
  actions: {
    loadTasks({commit}){
      return new Promise((resolve, reject) => {
        commit("setTasks", Tasks.tasks);
        resolve();
      });
    }
  },
  modules: {
  }
})

