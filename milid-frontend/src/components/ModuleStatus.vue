<template>
  <div class="status " :class="'theme-'+module.theme">
    <div class="title primary-on-text">{{module.title}}</div>
    <ModuleProgress :pipCount="module.lessons.length" :completedPips="pips" :theme="module.theme" class="progress"></ModuleProgress>    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ModuleProgress from '../components/ModuleProgress.vue';
import { $metric } from '@/services';

import { MILID } from '../models';

@Component({
  components:{ ModuleProgress }
})
export default class ModuleStatus extends Vue {
  private _subs = null;
  private pips = 0;
  @Prop() private module!: MILID.Module;

  mounted() {

    // FIXME remove sub on exit // unsubscribe() 
    this._subs = $metric.onUpdate().subscribe(this.computePips);
    this.computePips();
  }

  beforeDestroy() {
    if(this._subs) {
      this._subs.unsubscribe();
    }
  }

  computePips(event?) {
    const lessons = Object.keys($metric.progressionState);
    this.pips = lessons.filter(lesson => {
      return $metric.progressionState[lesson].state == 'done' && 
             $metric.progressionState[lesson].module == this.module.id;
    }).length || 0;    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .status {
    width: calc( 100vw - 50px );
    margin: 1px auto;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    .progress {
      height: 25px;
      width: 41%;
      margin: auto;
      // margin-left: 20px; // breaks canvas size computation
    }

    .title {
      font-size: 15px;
      font-weight: 700;
      padding: 6px 0;  
      width: 50%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-align: left;          
    }
  }

</style>
