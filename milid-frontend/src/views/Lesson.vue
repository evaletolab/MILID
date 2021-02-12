<template >
  <div v-if="module" :class="'theme-'+ module.theme" class="module">
    <!-- DEFAULT TOOLBAR -->
    <nav class="toolbar primary">
      <div class="toolbar-row">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button" @click="onBack()">
            <md-icon class="primary">arrow_back</md-icon>
          </md-button>
        </div>

        <div class="toolbar-title title-left">
          <span>M1.01<br/>qu'est-ce qu'une donnée?</span>
        </div>        

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button">
            <md-icon class="primary">more_vert</md-icon>
          </md-button>
        </div>
      </div>

      <div class="toolbar-row">
        <div class="toolbar-title ">
          <ModuleProgress :pipCount="count" :completedPips="position" color="white" class="progress"></ModuleProgress>    
        </div>
      </div>        

    </nav>

    <md-speed-dial class="md-bottom-right ">
      <md-speed-dial-target class="primary">
        <md-icon>add</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button class="md-icon-button">
          <md-icon>note</md-icon>
        </md-button>

        <md-button class="md-icon-button ">
          <md-icon>event</md-icon>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>    

    <ContentSwipe :initial="$route.params.lesson_id" :lessons="lessons" @changeCard="renderChange">
      <section class="lesson rendered-item"
          v-for="(lesson, index) in renderLessons" :key="lesson.id" :id="lesson.id"          
          v-bind:index="index">
        <h2>{{lesson.title}}</h2>
        <div class="item type ">
          <MILIDIcons name="podcast" :theme="module.theme"/>
        </div>
        <div class="item content ">Yeah!</div>
      </section>

    </ContentSwipe>
  </div>
  <!--- WHEN MODULE IS NOT READY -->
  <div v-else>    
    <h1>Le Module {{$route.params.module_id}} n'est pas disponible</h1>
  </div>

</template>

<style lang="scss" scoped>

  .toolbar {
    border-radius: 0 0 25px 25px;
    flex-flow: row wrap;
    position: relative;
    z-index: 2;    
    .toolbar-title{
      text-align: center;
      font-size: 17px;
      font-weight: 500;
      letter-spacing: .005em;
      line-height: 20px;      
      margin-top: .9em;
      margin-bottom: .9em;
      text-transform: uppercase;
      font-weight: 700;
      text-overflow: ellipsis;
      white-space: nowrap;      
      overflow: hidden;
      width: 100%;
      &.title-left{
        text-align: left;
      }
      .progress{
        width: 180px;
        height: 40px;
        margin: auto;        
      }
    }

    .toolbar-row {
      width: 100%;
      min-height: 38px;
      display: flex;
      align-items: center;
      align-content: center;
    }
  }

  .toolbar + .toolbar {
    margin-top: 16px;
  }

  
  .md-speed-dial.md-bottom-right {
    position: fixed;
    z-index: 2;
  }

  section.lesson {
    opacity: 0.8;
    .type {
      padding: 80px;
    }

    &.active-card {
      opacity: 1;
      transition: opacity 1000ms;
    }    

    .content {
      height: calc( 100vh - 30px );
      width: 100vw;
    }
  }


</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route} from 'vue-router';

import { $config, $module } from '../services';
import { MILID } from '../models';

import ContentSwipe from '../components/ContentSwipe.vue';
import MILIDIcons from '../components/MILIDIcons.vue';
import ModuleProgress from '../components/ModuleProgress.vue';

import MdButton  from 'vue-material'
import MdSpeedDial  from 'vue-material'


Vue.use(MdButton);
Vue.use(MdSpeedDial);

@Component({
  components: { ContentSwipe, MILIDIcons, ModuleProgress }
})
export default class Lesson extends Vue {
  //private _observer: any;
  private renderLessons$: MILID.Lesson[] = [];
  test = [];

  //
  // vues methods
  beforeRouteEnter(to: Route, from: Route, next: any) {
    const load = [$config.get(),$module.getAll()];
    Promise.all(load).then(next);
  }

  beforeDestroy () {
    //this._observer.disconnect();
  }

  mounted() {    
    window.scroll(0,0);
  }

  //
  // computed properties
  get count() {
    return this.lessons.length + 1;
  }

  get position(){
    return Number.parseInt(this.$route.params.lesson_id || "0");
  }

  get config(){
    return $config.store.config;
  }

  get module() {
    return $module.store.modules.find((m: any)=>m.id === this.$route.params.module_id);    
  }

  get lessons() {
    const lessons = this.module.lessons;
    return lessons;
  }

  get renderLessons() {
    if(!this.renderLessons$.length) {
      const index =  Number.parseInt(this.$route.params.lesson_id || "0");
      const lessons = this.module.lessons;
      const lastIndex = lessons.length - 1;
      const prevIndex = index === 0 ? lastIndex : index - 1;
      const nextIndex = index === lastIndex ? 0 : index + 1;

      this.renderLessons$ = [lessons[prevIndex],lessons[index],lessons[nextIndex]];
    }
    return this.renderLessons$;
  }  

  renderChange(renderLessons) {
    this.renderLessons$ = [...renderLessons];
    this.$router.push({ path: `/module/${this.module.id}/lesson/${renderLessons[1].id}`}).catch(()=> {
      //
    });
  }

  themePrimary(theme) {
    return this.config.themes[theme].primary;
  }

  themeSecondary(theme) {
    return this.config.themes[theme].secondary;
  }

  themeTertiary(theme) {
    return this.config.themes[theme].tertiary;
  }

  //
  // only for devel purposes
  getStyle(lesson: any) {
    const styleObj = {
      background: (lesson.color || 'white')
    }
    return styleObj;
  }


  onBack() {
    this.$router.push({ path: `/home`});
  }

}
</script>
