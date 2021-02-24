
import './ts/class-component-hooks.ts';

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false

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

