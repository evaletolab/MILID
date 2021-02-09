<template >
  <div class="scroll-snap-container fullscreen horizontal"        
       v-on:scroll="onScroll"
       v-if="module">
    <section class="lesson" 
        v-for="lesson in lessons"
        :key="lesson.id"
        v-bind:style="getStyle(lesson)">
      <h2>{{lesson.title}}</h2>
      <div class="item content">Yeah!</div>
    </section>

  </div>
  <!--- WHEN MODULE IS NOT READY -->
  <div v-else>    
    <h1>Le Module {{$route.params.module_id}} n'existe pas</h1>
  </div>

</template>

<style lang="scss" scoped>
  section.lesson {
    opacity: 0.5;

    &.is-visible {
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


@Component({
  components: { }
})
export default class Lesson extends Vue {
  private _observer: any;
  //
  // vues methods
  beforeRouteEnter(to: Route, from: Route, next: any) {
    const load = [$config.get(),$module.getAll()]
    Promise.all(load).then(next);
  }

  beforeDestroy () {
    this._observer.disconnect();
  }

  mounted () {
    const options = {
      root: this.$el,
      rootMargin: '0px',
      threshold: 0.25
    }

    const observerCallback = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.intersectionRatio >= 0.25) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      })
    };

    this._observer = new IntersectionObserver(observerCallback, options)
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      this._observer.observe(section)
    });

  }


  //
  // template attributes
  get module() {
    return $module.store.modules.find((m: any)=>m.id === this.$route.params.module_id);    
  }

  get lessons() {
    return this.module.lessons;
  }

  //
  // public methods

  //
  // only for devel purposes
  getStyle(lesson: any) {
    const styleObj = {
      background: (lesson.color || 'white')
    }
    return styleObj;
  }

  onScroll($event: any) {
    // console.log('---- scroll',$event);
  }
}
</script>
