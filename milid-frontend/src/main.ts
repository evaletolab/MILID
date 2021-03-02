
import './ts/class-component-hooks.ts';

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false

import '@/main.scss'

import { $config, $module, $metric } from '@/services';
const load = [$config.get(), $module.getAll(),$metric.get()];

Promise.all(load).
then(() => {
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
})
.catch(e => {
  console.log("error", e);
})

