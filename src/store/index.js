import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cocktails: [],

  },
  mutations: {
    addCocktail({ state }, cocktail) {
      state.cocktails.push(cocktail)
    },
    removeCocktail({ state }, idCocktail) {
      state.cocktails.splice(idCocktail, 1)
    }
  },
  actions: {
  },
  modules: {
  }
})
