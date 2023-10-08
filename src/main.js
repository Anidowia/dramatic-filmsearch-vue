import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueGtag from "vue-gtag";

const app = createApp(App);

app.use(VueGtag, {
  config: { id: "G-FJQSM3X19C" },
  params: { anonymize_ip: true }
});

app.use(router);
app.use(store);
app.mount('#app');
