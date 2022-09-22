import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import InstantSearch from 'vue-instantsearch/vue3/es';
import VueObserveVisibility from 'vue3-observe-visibility';
//import 'instantsearch.css/themes/satellite-min.css';
import "./assets/main.css";


const app = createApp(App)

app.use(router)
app.use(VueObserveVisibility)
app.use(InstantSearch)

app.mount('#app')
