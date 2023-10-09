import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueGtag from "vue-gtag";

const app = createApp(App);

app.use(VueGtag, {
  config: { id: "G-FQ11FB22LJ" },
  params: { anonymize_ip: true, 'send_page_view': true }
  
});

app.use(router);
app.use(store);
app.mount('#app');
