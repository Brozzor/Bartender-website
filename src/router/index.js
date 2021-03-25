import Vue from "vue";
import VueRouter from "vue-router";

import auth from "../middleware/auth";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Configuration from "../views/admin/Configuration.vue";
import Cocktail from "../views/admin/Cocktail.vue";
import Led from "../views/admin/Led.vue";
import Consommable from "../views/admin/Consommable.vue";
import Log from "../views/admin/Log.vue";
import ErrorView from "../views/Layout/error.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      middleware: auth,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/admin/configuration",
    name: "Configuration",
    component: Configuration,
  },
  {
    path: "/admin/led",
    name: "Led",
    component: Led,
  },
  {
    path: "/admin/cocktail",
    name: "Cocktail",
    component: Cocktail,
  },
  {
    path: "/admin/consommable",
    name: "Consommable",
    component: Consommable,
  },
  {
    path: "/admin/log",
    name: "Log",
    component: Log,
  },
  { path: "/:pathMatch(.*)*", component: ErrorView },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
