import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import Configuration from '../views/admin/Configuration.vue'
import Cocktail from '../views/admin/Cocktail.vue'
import Consommable from '../views/admin/Consommable.vue'
import Log from '../views/admin/Log.vue'
import ErrorView from '../views/Layout/error.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin/configuration',
    name: 'Configuration',
    component: Configuration
  },
  {
    path: '/admin/cocktail',
    name: 'Cocktail',
    component: Cocktail
  },
  {
    path: '/admin/consommable',
    name: 'Consommable',
    component: Consommable
  },
  {
    path: '/admin/log',
    name: 'Log',
    component: Log
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Dashboard
  },
  { path: '/:pathMatch(.*)*', component: ErrorView }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
