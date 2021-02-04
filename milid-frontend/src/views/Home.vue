<template>
  <div class="home">
    <h1>This is THE Home page</h1>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { $config } from '../services/config-service'


@Component({  
  components: {
  },
})
export default class Home extends Vue {
  config: any;

  constructor(){
    super();
    //
    // should always be preloaded
    this.config = $config.get()
  }
}
</script>
