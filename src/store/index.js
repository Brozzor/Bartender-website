import Vue from 'vue'
import Vuex from 'vuex'
import Api from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cocktails: [],
    ingredient: ["Tequila", "Jus d'orange", "Sirop de grenadine", "Vodka", "Kas citron", "Sirop de fraise"]
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
    async getConsommable ({ commit }) {
      try {
        const response = await Api.get(
          'https://api.party.buisson.us' + '/consommable'
        ).catch(err => {
          if (err.response.status === 400) {
            throw new Error(err.response.data.error)
          }
          throw err
        })
        return response
      } catch (error) {
        return { error: error.message }
      }
    },
    async getConfiguration ({ commit }) {
      try {
        const response = await Api.get(
          'https://api.party.buisson.us' + '/configuration'
        ).catch(err => {
          if (err.response.status === 400) {
            throw new Error(err.response.data.error)
          }
          throw err
        })
        return response
      } catch (error) {
        return { error: error.message }
      }
    },
    async getCocktail ({ commit }) {
      try {
        const response = await Api.get(
          'https://api.party.buisson.us' + '/cocktail'
        ).catch(err => {
          if (err.response.status === 400) {
            throw new Error(err.response.data.error)
          }
          throw err
        })
        return response
      } catch (error) {
        return { error: error.message }
      }
    },
    async editConfiguration ({ commit }, form) {
      try {
        const response = await Api.post(
          'https://api.party.buisson.us' + '/configuration/update', form
        ).catch(err => {
          if (err.response.status === 400) {
            throw new Error(err.response.data.error)
          }
          throw err
        })
        return response
      } catch (error) {
        return { error: error.message }
      }
    },
    async addCocktail ({ commit }, form) {
      try {
        const response = await Api.post(
          'https://api.party.buisson.us' + '/cocktail', form
        ).catch(err => {
          if (err.response.status === 400) {
            throw new Error(err.response.data.error)
          }
          throw err
        })
        return response
      } catch (error) {
        return { error: error.message }
      }
    },
    async toServeCocktail ({ commit }, form) {
      try {
        const response = await Api.post(
          'https://api.party.buisson.us' + '/makeCocktail', form
        ).catch(err => {
          if (err.response.status === 400) {
            throw new Error(err.response.data.error)
          }
          throw err
        })
        return response
      } catch (error) {
        return { error: error.message }
      }
    },

  },
  modules: {
  }
})
