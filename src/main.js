import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

// Import Bootstrap and BootstrapVue 3 CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

// Import BootstrapVue 3
import { BootstrapVue3 } from 'bootstrap-vue-3';

// Create Vue application
const app = createApp(App);

// Make BootstrapVue 3 available throughout your project
app.use(BootstrapVue3);

// Configure axios
app.config.globalProperties.$http = axios;

// Use the router and store
app.use(router);
app.use(store);

// Mount the app
app.mount('#app');