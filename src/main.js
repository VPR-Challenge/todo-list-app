import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.use(store);
app.use(router);

if (store.getters.isAuthenticated) {
  store.dispatch('fetchUser').catch(() => {
    store.dispatch('logout');
    router.push('/login');
  });
}

app.mount('#app');
