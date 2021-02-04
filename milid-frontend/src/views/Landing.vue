<template>
  <div class="landing">
    <h1>Landing</h1>
    <p>create your pseudo</p>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { $config } from '../services/config-service';


@Component({
  components: { },
})
export default class Landing extends Vue {
  config: any; // MILID.Config;

  constructor(){
    super();
    //
    // should always be preloaded
    this.config = $config.get()
  }
}
</script>
