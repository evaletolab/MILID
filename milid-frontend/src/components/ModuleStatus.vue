<template>
  <div class="status">
    <div class="title">{{module.title}}</div>
    <ModuleProgress :module="module" class="progress" max="4" value="2"></ModuleProgress>    
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
      height: 20px;
      width: 50%;
      margin-left: 20px;
    }
  }

</style>
