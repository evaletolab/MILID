<template >
  <div class="-scroll-snap-container fullscreen horizontal" v-if="module">
    <div class="lesson" 
        v-for="lesson in lessons"
        :key="lesson.id">
      <h2>{{lesson.title}}</h2>
    </div>

  </div>
  <!--- WHEN MODULE IS NOT READY -->
  <div v-else>    
    <h1>Le Module {{$route.params.module_id}} n'existe pas</h1>
  </div>

</template>

<style lang="scss" scoped>

  // Info
  // https://css-tricks.com/practical-css-scroll-snapping/
  .scroll-snap-container {
        display: block;
        overflow-y: scroll;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        scroll-snap-points-y: repeat(100%);
        scroll-snap-destination: 0 0;
        scroll-snap-type: y mandatory;
        scroll-snap-type: mandatory;
        scroll-behavior: smooth;
    }
    .scroll-snap-container.horizontal {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        overflow-y: hidden;
        overflow-x: scroll;
        scroll-snap-points-x: repeat(100%);
        scroll-snap-type: x mandatory;
    }
    .scroll-snap-container.fullscreen {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: stretch;
        justify-content: flex-start;
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        min-width: 100%;
        min-height: 100%;
    }
    .scroll-snap-container.fullscreen.horizontal {
        flex-direction: row;
    }
    .item {
        scroll-snap-align: start;
    }
    .scroll-snap-container.fullscreen > .item {
        min-height: 100%;
        flex: 1;
    }
    .scroll-snap-container.horizontal > .item {
        scroll-snap-align: center;
    }
    .scroll-snap-container.fullscreen.horizontal > .item {
        scroll-snap-align: center;
        min-width: 100%;
        flex: 1;
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

  get module() {
    return $module.store.modules.find(m=>m.id === this.$route.params.module_id);    
  }

  get lessons() {
    return this.module.lessons;
  }

  beforeRouteEnter(to: Route, from: Route, next: any) {
    const load = [$config.get(),$module.getAll()]
    Promise.all(load).then(next);
  }
}
</script>
