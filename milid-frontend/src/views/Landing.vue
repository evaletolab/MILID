<template>
  <div class="landing">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Bienvenu Inscrivez-vous! </h1>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { $config } from '../services/config-service';

import HelloWorld  from '../components/HelloWorld.vue'; // @ is an alias to /src

@Component({  
  components: {
    HelloWorld,
  },
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
