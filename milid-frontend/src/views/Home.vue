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
    <h2>Olivier E.</h2>

    <!-- STATUS -->
    <ModuleStatus v-for="mod in modules" :key="mod.id+'status'"
                  :module="mod"></ModuleStatus>
    
    <!-- MODULE -->
    <div v-for="mod in modules" :key="mod.id" class="module ">
      <div class="title">{{mod.title}}</div>
      <div class="subtitle">{{mod.description}}</div>
      <div class="masonry-with-columns">
        <div v-for="lesson in mod.lessons" :key="lesson.id" 
            @click="routerLink(mod.id,lesson.id)"
            class="lesson">
          <div class="type">{{lesson.type}}</div>
          <div class="title">{{lesson.title}}</div>
        </div>
      </div>
      <!-- <li><router-link :to="'/module/' + mod.id + '/lesson/0'">{{ mod.title }}</router-link></li> -->
    </div>
    

  </div>
</template>

<style lang="scss" scoped>


  .md-elevation-4 {
    box-shadow: none;
  }


  .module {
    background: url('~@/assets/wave.svg') 0 -10%;
    background-repeat: no-repeat;
    text-align: left;
    padding-top: 30px;
    >.title {
      color: #333;
      text-transform: uppercase;
      padding-left: 10px;      
      font-weight: 700;
      line-height: 8px;
      font-size: 12px;      
    }
    >.subtitle{
      color: #333;
      padding-left: 10px;      
      font-weight: 700;
      font-size: 11px;      
    }

    .lesson {
      min-height:  100px;
      border: 1px solid #eee;
      border-radius: 10px;
      color: #333;
      background-color: rgba(255,255,255,0.85);
    }
  }


  .masonry-with-columns {
    columns: 6 140px;
    column-gap: 1rem;
    padding: 10px;
    background-color: var(--md-theme-default-accent);
    background-color: #9eaffd;
    >div.lesson {
      width: 150px;
      margin: 0 1rem 1rem 0;
      display: inline-block;
      width: 100%;
      text-align: center;
      font-family: system-ui;
      font-weight: 900;
    } 
  }  

  @for $i from 1 through 36 { 
    div.-lesson:nth-child(#{$i}) {
      $h: (random(400) + 100) + px;
      height: $h;
      line-height: $h;
    }
  }  
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


  routerLink(module,lesson) {
    this.$router.push({path:'/module/' + module + '/lesson/' + lesson});
  }

}
</script>
