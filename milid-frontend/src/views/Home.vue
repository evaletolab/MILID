<template>
  <div class="home">
    <!-- TOOLBAR -->
    <nav class="toolbar " :class="{'exited': (scrollDirection <= 0) }">
      <div class="toolbar-row">
        <div class="toolbar-section-start">
          <button class="icon start">
            <MILIDIcons name="home" color="black"/>
          </button>
        </div>

        <div class="toolbar-title">
          <img class="logo" src="@/assets/MILID-logo-text.svg" />
        </div>        

        <div class="toolbar-section-end">
          <button class="icon end">
            <MILIDIcons name="parametres" color="black"/>
          </button>
        </div>
      </div>

      <div class="toolbar-row">
      </div>        
    </nav>

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
          <img class="cover" v-if="lesson.cover" :src="lesson.cover" />
          <div class="title">{{lesson.title}}</div>
        </div>
      </div>
      <div class="bottom-wave"><MILIDWave name="bottom" :theme="mod.theme" :config="config" /></div>

      <!-- <li><router-link :to="'/module/' + mod.id + '/lesson/0'">{{ mod.title }}</router-link></li> -->
    </div>

    <!-- FULLSCREEN MODAL -->
    <router-view name="l2"/>

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
  components: { 
    ModuleStatus, 
    MILIDWave, 
    MILIDIcons 
  }
})
export default class Home extends Vue {
  private lastScrollTop = 0;

  scrollDirection = 0;

  get modules() {
    console.log("--DBG: modules", $module.modules);
    return $module.modules;    
  }

  get config(){
    return $config.store.config;
  }

  getType(lesson) {
    return this.config.icons[lesson.type];
  }

  themeTertiary(theme) {
    return this.config.themes[theme].tertiary;
  }

  beforeRouteEnter(to: Route, from: Route, next: any) {
    const load = [$config.get(),$module.getAll()];
    Promise.all(load).then(next);
  }

  mounted(){
    window.addEventListener("scroll", () => { 
      const st = window.pageYOffset || document.documentElement.scrollTop;
      //
      // downscroll code
      if (st > this.lastScrollTop){
        this.scrollDirection = 1;
      } 
      //
      // upscroll code
      else {          
        this.scrollDirection = -1;
      }

      //
      // For Mobile or negative scrolling
      this.lastScrollTop = st <= 0 ? 0 : st; 

    }, false);    
  }

  routerLink(module,lesson) {
    this.$router.push({path:'/module/' + module + '/lesson/' + lesson});
  }

}
</script>
