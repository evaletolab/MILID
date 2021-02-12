<template>
  <div>
    <md-toolbar class="-md-large -md-primary">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button">
            <md-icon>menu</md-icon>
          </md-button>
        </div>

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button">
            <md-icon>refresh</md-icon>
          </md-button>

          <md-button class="md-icon-button">
            <md-icon>more_vert</md-icon>
          </md-button>
        </div>
      </div>

      <!-- <div class="md-toolbar-row md-toolbar-offset">
        <h3 class="md-title">Title on a second row</h3>
      </div> -->
    </md-toolbar>

    <!-- USER -->
    <div class="user">
      <MILIDIcons name="user" theme="1"/>
      <h2>Olivier E.</h2>
    </div>

    <!-- STATUS -->
    <ModuleStatus v-for="mod in modules" :key="mod.id+'status'"
                  :module="mod"></ModuleStatus>
    
    <!-- MODULE -->
    <div v-for="mod in modules" :key="mod.id" class="module " >
      <div class="top-wave"><MILIDWave name="top" :theme="mod.theme" :config="config" /></div>
      <div class="title">{{mod.title}}</div>
      <div class="subtitle">{{mod.description}}</div>
      <div class="masonry-with-columns" :style="{ backgroundColor: themeTertiary(mod.theme)}">
        <div v-for="lesson in mod.lessons" :key="lesson.id" 
            @click="routerLink(mod.id,lesson.id)"
            class="lesson">
          <div class="type">
            <MILIDIcons :name="getType(lesson)" :theme="mod.theme"/>
          </div>
          <div class="title">{{lesson.title}}</div>
        </div>
      </div>
      <div class="bottom-wave"><MILIDWave name="bottom" :theme="mod.theme" :config="config" /></div>

      <!-- <li><router-link :to="'/module/' + mod.id + '/lesson/0'">{{ mod.title }}</router-link></li> -->
    </div>

  </div>
</template>

<style lang="scss" scoped>
   @import "./Home.scss";
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { $config, $module } from '../services';

import ModuleStatus from '../components/ModuleStatus.vue';
import MILIDWave from '../components/MILIDWave.vue';
import MILIDIcons from '../components/MILIDIcons.vue';


@Component({
  components: { ModuleStatus, MILIDWave, MILIDIcons },
})
export default class Home extends Vue {


  get modules() {
    return $module.store.modules;    
  }

  get config(){
    return $config.store.config;
  }

  getType(lesson) {
    //console.log('----',lesson.type, this.config.icons[lesson.type])
    return this.config.icons[lesson.type];
  }

  themeTertiary(theme) {
    return this.config.themes[theme].tertiary;
  }

  beforeRouteEnter(to: Route, from: Route, next: any) {
    const load = [$config.get(),$module.getAll()]
    Promise.all(load).then(next);
  }


  routerLink(module,lesson) {
    this.$router.push({path:'/module/' + module + '/lesson/' + lesson});
  }

}
</script>
