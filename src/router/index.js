import { createRouter, createWebHistory } from 'vue-router';

// Importer les middlewares
import auth from '../middleware/auth';
import authAdmin from '../middleware/authAdmin';

// Importer les vues
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Configuration from '../views/admin/Configuration.vue';
import Cocktail from '../views/admin/Cocktail.vue';
import Led from '../views/admin/Led.vue';
import Consommable from '../views/admin/Consommable.vue';
import Log from '../views/admin/Log.vue';
import AdminLogin from '../views/admin/Login.vue';
import ErrorView from '../views/Layout/error.vue';

// Définir les routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      middleware: auth,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin/',
    redirect: '/admin/login'
  },
  {
    path: '/admin/configuration',
    name: 'Configuration',
    component: Configuration,
    meta: {
      middleware: authAdmin,
    },
  },
  {
    path: '/admin/led',
    name: 'Led',
    component: Led,
    meta: {
      middleware: authAdmin,
    },
  },
  {
    path: '/admin/cocktail',
    name: 'Cocktail',
    component: Cocktail,
    meta: {
      middleware: authAdmin,
    },
  },
  {
    path: '/admin/consommable',
    name: 'Consommable',
    component: Consommable,
    meta: {
      middleware: authAdmin,
    },
  },
  {
    path: '/admin/log',
    name: 'Log',
    component: Log,
    meta: {
      middleware: authAdmin,
    },
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
  },
  { 
    path: '/:pathMatch(.*)*', 
    component: ErrorView 
  },
];

// Créer le routeur
const router = createRouter({
  history: createWebHistory(), // Utiliser `import.meta.env.BASE_URL` pour la base URL
  routes,
});

// Fonction de gestion des middlewares
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

// Configurer les guards de navigation
router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 0);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;