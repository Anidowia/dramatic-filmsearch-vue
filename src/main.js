import { createApp } from 'vue';
import App from './App.vue';
import './assets/sass/style.css';
import router from './router';
import store from './store';
import { createGtm } from '@gtm-support/vue-gtm';
const app = createApp(App);

app.use(router); 

app.use(
    createGtm({
      id: "GTM-WLJPV9H4",
      vueRouter: router
    })
  );
  
router.beforeEach((to, from, next) => {
    if (typeof to.name === "string") {
        const title = to.name;
    if (title) {
        document.title = title;
    }
}
next();
});  

app.use(store);
app.mount('#app');
