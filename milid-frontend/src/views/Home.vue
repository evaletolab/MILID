<template>
  <div>
    <h1>Home</h1>
    <h2>Module {{ config.version }}</h2>

    <ul v-for="mod in modules" :key="mod.id">
      <li><a :href="`/module/${mod.id}/lesson/0`">{{ mod.title }} lesson 0</a></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { $config, $module } from '../services'


@Component({
  components: { },
})
export default class Home extends Vue {

  constructor(){
    super();
  }

  get modules() {
    return $module.store.modules;    
  }

  get config(){
    return $config.store.config;
  }

  beforeRouteEnter(to: Route, from: Route, next: any) {
    const load = [$config.get(),$module.getAll()]
    Promise.all(load).then(next);
  }

}
</script>
