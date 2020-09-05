import Vue from 'vue'
import router from './router/router'
import store from './store/store'
import './app/filters/filter'

// main component
import App from './App.vue'

// axios
import axios from 'axios'

// vuetify
import vuetify from './plugins/vuetify/vuetify'

// vuelidate
import Vuelidate from 'vuelidate'

// tiptap editor
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'
import 'vuetify/dist/vuetify.min.css'

// vue toasted
import Toasted from 'vue-toasted'

// ----------------------------------
// Configuration
// ----------------------------------
import config from '@/app/config/config'
const isDev = process.env.NODE_ENV === 'development'

Vue.config.devtools = isDev
Vue.config.performance = isDev
Vue.config.productionTip = isDev
Vue.http = Vue.prototype.$http = axios

// packages init
Vue.use(Vuelidate)
Vue.use(Toasted, config.toasted)
Vue.use(TiptapVuetifyPlugin, config.tiptap)

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
