<template>
  <div class="status">
    <div class="title">{{module.title}}</div>
    <ModuleProgress :pipCount="4" :completedPips="1" :color="'#ffaa00'" class="progress"></ModuleProgress>    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ModuleProgress from '../components/ModuleProgress.vue';

import { MILID } from '../models';

@Component({
  components:{ ModuleProgress }
})
export default class ModuleStatus extends Vue {
  @Prop() private module!: MILID.Module;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .status {
    width: calc( 100vw - 50px );
    margin: 10px 50px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    .progress {
      height: 35px;
      width: 50%;
      // margin-left: 20px; // breaks canvas size computation
    }
  }

</style>
