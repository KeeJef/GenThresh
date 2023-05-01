import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { loadFonts } from './plugins/webfontloader'
import './assets/tailwind.css'
import { createPinia } from 'pinia'
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

loadFonts()

createApp(App)
  .use(createPinia())
  .use(Toast,{position: POSITION.BOTTOM_RIGHT})
  .use(router)
  .mount('#app')
