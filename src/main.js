import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import VueMask from 'v-mask'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

Vue.use(VueMask)
Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
