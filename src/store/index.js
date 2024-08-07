import { createStore } from 'vuex';
import Api from 'axios'

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
console.log(API_BASE_URL)
const HEADERS = {
  headers: {
    Authorization: 'Bearer ' + localStorage.token
  }
}
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
    async getConsumables ({ commit }) {
      try {
        const response = await Api.get(
          API_BASE_URL + '/consumable', HEADERS
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
    async getBar ({ commit }) {
      try {
        const response = await Api.get(
          API_BASE_URL + '/bar', HEADERS
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
          HEADERS
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
    async editBar ({ commit }, form) {
      try {
        const response = await Api.put(
          API_BASE_URL + '/bar', form,
          HEADERS
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
          HEADERS
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
          HEADERS
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
    async addConsumable ({ commit }, form) {
      try {
        const response = await Api.post(
          API_BASE_URL + '/consumable', form,
          HEADERS
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
    async removeConsumable ({ commit }, id) {
      try {
        const response = await Api.delete(
          API_BASE_URL + '/consumable/' + id,
          HEADERS
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
    async orderCocktail ({ commit }, form) {
      try {
        const response = await Api.post(
          API_BASE_URL + '/cocktail/order', form
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
          API_BASE_URL + '/auth/login', form
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
          API_BASE_URL + '/auth/admin/login', form
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
    }

  },
  modules: {
  }
});
