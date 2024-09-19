import { createStore } from 'vuex';
import Api from 'axios'

const API_BASE_URL = "https://party.buisson.us/api/v1";
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
          API_BASE_URL + '/consumable', {
          headers: {
            Authorization: 'Bearer ' + localStorage.token
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
    async getBar ({ commit }) {
      console.log({
        headers: {
          Authorization: 'Bearer ' + localStorage.token
        }
      })
      try {
        const response = await Api.get(
          API_BASE_URL + '/bar', {
          headers: {
            Authorization: 'Bearer ' + localStorage.token
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
            Authorization: 'Bearer ' + localStorage.token
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
    async editBar ({ commit }, form) {
      try {
        const response = await Api.put(
          API_BASE_URL + '/bar', form,
          {
          headers: {
            Authorization: 'Bearer ' + localStorage.token
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
            Authorization: 'Bearer ' + localStorage.token
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
            Authorization: 'Bearer ' + localStorage.token
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
    async addConsumable ({ commit }, form) {
      try {
        const response = await Api.post(
          API_BASE_URL + '/consumable', form,
          {
          headers: {
            Authorization: 'Bearer ' + localStorage.token
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
    async removeConsumable ({ commit }, id) {
      try {
        const response = await Api.delete(
          API_BASE_URL + '/consumable/' + id,
          {
          headers: {
            Authorization: 'Bearer ' + localStorage.token
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
