import App from './App.vue'
import './assets/sass/style.css'
import router from './router';
import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'; 
const app = createApp(App);
app.use(router);
app.mount('#app');