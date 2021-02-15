<template>
  <div class="landing">
    <div id="nav" class="topbar title ">
      <div class="left">
        <span class="version">{{ config.version }}</span>
      </div>
      <div class="">
        <router-link class="link" to="/home">Home</router-link> 
        <router-link class="link" to="/About">About</router-link> 
      </div>
      <div class="right hide-sm">
        <router-link class="link btn" to="/dashboard">Dashboard</router-link>
      </div>

    </div>

    <p>create your pseudo</p>
    <section>
      <img src="@/assets/MILID-logo.svg" />
    </section>
    <section>

    </section>
  </div>
</template>

<style lang="scss" scoped>

  .landing{
    background: #8761ff;
    color: white;
    position: fixed;
    width: 100vw;
    height: 100vh;
    .topbar{
      width: calc( 100vw - 30px );
      display: flex;
      flex-wrap: wrap;
      margin-right: -15px;
      margin-left: -15px;
      line-height: 80px;
      .left{
        flex: 0 0 20%;
        max-width: 20%;        
      }
      .title{
        flex: 0 0 60%;
        max-width: 60%;        
      }
      .right{
        flex: 0 0 20%;
        max-width: 20%;        
      }

      .link {
        padding: 23px 0 23px;
        font-size: 16px;
        font-weight: 500;        
        padding-left: 19px;
        padding-right: 19px;
        &:hover{
          background: rgba(93, 119, 143, 0.4);
        }
        
      }
    }

    .btn {
      border-radius: 50px;      
      background: #fff!important;
      border-color: #fff;
      color: #36324a;
      padding: 15px 20px!important;      
    }

    .version {
      font-weight: 200;
      opacity: .5;
    }

    section{
      max-width: 50%;
      max-height: calc( 100vh - 80px );
      @media (max-width: 376px) {
        max-width: 100%;
        
      }
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
