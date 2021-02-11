
import './ts/class-component-hooks.ts';

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
