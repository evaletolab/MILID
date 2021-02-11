<template>
  <div>
    <h1>Home</h1>
    <h2>Module {{ config.version }}</h2>
    <ModuleStatus v-for="mod in modules" :key="mod.id+'status'"
                  :module="mod"></ModuleStatus>
    <h4>Links</h4>                  
    <ul v-for="mod in modules" :key="mod.id">
      <li><router-link :to="'/module/' + mod.id + '/lesson/0'">{{ mod.title }}</router-link></li>
    </ul>

  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { $config, $module } from '../services';

import ModuleStatus from '../components/ModuleStatus.vue';


@Component({
  components: { ModuleStatus },
})
export default class Home extends Vue {


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
