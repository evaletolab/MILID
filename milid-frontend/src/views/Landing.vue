<template>
  <div class="landing">
    <h1 >Landing {{ config.version }}</h1>
    <p>create your pseudo</p>
    <section>
      <img src="@/assets/MILID-logo.svg" />
    </section>
    <section>
    <div id="nav">
      <router-link to="/">Landing</router-link> |
      <router-link to="/home">Home</router-link> |
      <router-link to="/About">About</router-link> |
      <router-link to="/dashboard">Dashboard</router-link>
    </div>

    </section>
  </div>
</template>

<style lang="scss" scoped>
  .landing{
    background: #8761ff;
    color: white;

    section{
      max-width: 50%;
      max-height: calc( 100vh - 80px );
    }
  }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { $config } from '../services';


@Component({
  components: { },
})
export default class Landing extends Vue {
  constructor(){
    super();
  }

  async mounted(){
    console.log('--- mounted',$config.store.config)
  }

  get config(){
    return $config.store.config;
  }

  beforeRouteEnter(to: any, from: any, next: any) {
    $config.get().then(next)
  }

}
</script>
