import { createStore } from 'vuex';
import Api from 'axios'
// dotenv
import 'dotenv/config'
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
console.log(API_BASE_URL)
export default createStore({
  state: {
    cocktails: [],
    ingredient: ['Tequila', 'Jus d\'orange', 'Sirop de grenadine', 'Vodka', 'Kas citron', 'Sirop de fraise']
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
          API_BASE_URL + '/consommable'
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
          API_BASE_URL + '/configuration'
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
          API_BASE_URL + '/cocktail'
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
    async getLog ({ commit }) {
      try {
        const response = await Api.get(
          API_BASE_URL + '/log',
          {
            headers: {
              tokenSession: localStorage.tokenSession
            }
          }
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
          API_BASE_URL + '/configuration/update', form,
          {
            headers: {
              tokenSession: localStorage.tokenSession
            }
          }
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
          API_BASE_URL + '/cocktail', form,
          {
            headers: {
              tokenSession: localStorage.tokenSession
            }
          }
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
    async removeCocktail ({ commit }, id) {
      try {
        const response = await Api.delete(
          API_BASE_URL + '/cocktail/' + id,
          {
            headers: {
              tokenSession: localStorage.tokenSession
            }
          }
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
    async addConsommable ({ commit }, form) {
      try {
        const response = await Api.post(
          API_BASE_URL + '/consommable', form,
          {
            headers: {
              tokenSession: localStorage.tokenSession
            }
          }
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
    async removeConsommable ({ commit }, id) {
      try {
        const response = await Api.delete(
          API_BASE_URL + '/consommable/' + id,
          {
            headers: {
              tokenSession: localStorage.tokenSession
            }
          }
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
          API_BASE_URL + '/makeCocktail', form
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
    async checkIsAuth ({ commit }, form) {
      try {
        const response = await Api.post(
          API_BASE_URL + '/checkIsAuth', form
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
    async login ({ commit }, form) {
      try {
        const response = await Api.post(
          API_BASE_URL + '/login', form
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
    async loginAdmin ({ commit }, form) {
      try {
        const response = await Api.post(
          API_BASE_URL + '/admin/login', form
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
    async changeState ({ commit }, value) {
      try {
        const response = await Api.post(
          'https://api.party.buisson.us/led/' + value, {},
          {
            headers: {
              tokenSession: localStorage.tokenSession
            }
          }
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
    async ledBrightness ({ commit }, data) {
      try {
        const response = await Api.post(
          'https://api.party.buisson.us/led/changeBrightness', data,
          {
            headers: {
              tokenSession: localStorage.tokenSession
            }
          }
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
    async changeEffect ({ commit }, data) {
      try {
        const response = await Api.post(
          'https://api.party.buisson.us/led/changeEffect', data,
          {
            headers: {
              tokenSession: localStorage.tokenSession
            }
          }
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
});
