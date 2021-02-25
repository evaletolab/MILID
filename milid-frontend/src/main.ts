
import './ts/class-component-hooks.ts';

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false

import '@/main.scss'

import { $config } from '@/services/config-service';
import { $module } from '@/services/module-service';
import { $metric } from '@/services/metric-service';

const load = [$config.get(), $module.getAll()];
Promise.all(load).
then(() => {
  console.log("services loaded");
  $metric.init(); // must be called after $module is ready
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
})
.catch(e => {
  console.log("error", e);
})

