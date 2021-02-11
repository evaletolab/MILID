<template >
  <div v-if="module">
    <!-- DEFAULT TOOLBAR -->
    <md-toolbar class="-md-large md-primary">
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

    <md-speed-dial class="md-bottom-right">
      <md-speed-dial-target>
        <md-icon>add</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button class="md-icon-button">
          <md-icon>note</md-icon>
        </md-button>

        <md-button class="md-icon-button">
          <md-icon>event</md-icon>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>    

    <ContentSwipe :lessons="lessons" @changeCard="renderChange">
      <section class="lesson rendered-item"
          v-for="(lesson, index) in renderLessons" :key="lesson.id" :id="lesson.id"
          v-bind:style="getStyle(lesson)"
          v-bind:index="index">
        <h2>{{lesson.title}}</h2>
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

  .md-toolbar + .md-toolbar {
    margin-top: 16px;
  }

  .md-speed-dial.md-bottom-right {
    position: fixed;
    z-index: 2;
  }

  section.lesson {
    opacity: 0.8;

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

import ContentSwipe from '../components/ContentSwipe.vue';
import { MILID } from '../models';

import MdToolbars  from 'vue-material'
import MdButton  from 'vue-material'
import MdSpeedDial  from 'vue-material'

Vue.use(MdToolbars);
Vue.use(MdButton);
Vue.use(MdSpeedDial);

@Component({
  components: { ContentSwipe }
})
export default class Lesson extends Vue {
  //private _observer: any;
  private renderLessons$: MILID.Lesson[] = [];
  test = [];

  //
  // vues methods
  beforeRouteEnter(to: Route, from: Route, next: any) {
    const load = [$config.get(),$module.getAll()]
    Promise.all(load).then(next);
  }

  beforeDestroy () {
    //this._observer.disconnect();
  }



  //
  // computed properties
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
    console.log('---- get',this.renderLessons$[1].title);
    return this.renderLessons$;
  }

  renderChange(renderLessons) {
    this.renderLessons$ = [...renderLessons];
    this.$router.push({ path: `/module/${this.module.id}/lesson/${renderLessons[1].id}`}).catch(()=> {
      //
    });
  }

  //
  // only for devel purposes
  getStyle(lesson: any) {
    const styleObj = {
      background: (lesson.color || 'white')
    }
    return styleObj;
  }


}
</script>
