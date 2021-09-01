import Vue from 'vue'
import App from './App.vue'
import { Vuelidate } from 'vuelidate'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import router from './routes'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuelidate)
Vue.use(VueResource)
Vue.use(BootstrapVue)


Vue.http.options.root = 'https://localhost:44383/api/'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
