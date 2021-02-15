
import './ts/class-component-hooks.ts';

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import '@/main.scss'

import { $config } from '@/services/config-service';
import { $module } from '@/services/module-service';

const load = [$config.get(), $module.getAll()];
Promise.all(load).
then(() => {
  console.log("services loaded");
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
})
.catch(e => {
  console.log("error", e);
})

