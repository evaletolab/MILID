<template>
  <div class="landing">
    <div id="nav" class="topbar title ">
      <div class="left">
        <span class="version">{{ config.version }}</span>
      </div>
      <div class="right hide-sm">
        <router-link class="link btn" to="/dashboard">Dashboard</router-link>
      </div>

    </div>

    <section>
      <img src="@/assets/MILID-logo.svg" />
    </section>
    <section>
      <input v-model="pseudo" placeholder="Choisir un pseudo ..." class="pseudo"/>


    </section>
    <section class="bottom " :class="{'open':open,'primary':!open}" @click="onToggle">
      <MILIDIcons name="back-top" color="white" />
      <div class="content">
        <h3>L'expérience est meilleure après installation</h3>
        <button class="btn tertiary" @click="onInstall">Ajouter à l'écran d'acceuil</button>
        <div>Test</div>        
      </div>        
    </section>

  </div>
</template>

<style lang="scss" scoped>

  .landing{
    background: var(--md-theme-default-primary);
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

    .version {
      font-weight: 200;
      opacity: .5;
    }

    section{
      padding: 50px 70px;
      max-width: 50%;
      max-height: calc( 100vh - 80px );
      @media (max-width: 376px) {
        max-width: 100%;
        
      }
    }
  }

  .btn {
    border-radius: 50px;
    background: var(--theme-1-tertiary);
    border: 1px solid var(--theme-1-tertiary);
    color: var(--theme-1-secondary);
    text-align: center;
    padding: 15px 25px !important;
    margin: auto;
    font-size: 17px;
    outline: 0;
  }

  input.pseudo {
    line-height: 20px;
    height: 24px;
    font-size: 16px;
    color: #444;
    padding: 2px 15px;
    border-radius: 15px;
    border: none;      
  }

  section.bottom {
    color: white;
    background-color: white;
    border:1px solid var(--theme-1-tertiary);
    position: fixed;
    bottom: 0;
    left:0;
    height: calc(100vh - 100px);
    width: calc( 100vw - 10px );
    text-align: center;
    border-radius: 20px 20px 0 0;
    padding: 0 5px;    
    transform: translateY(calc(100vh - 120px));
    transition: all 200ms;      
    box-shadow: 0 2px 8px 3px rgba(0, 0, 0, 0.2);


    &.open {
      transform: translateY(410px);
      svg{
        transform: translateY(-30px) translateX(3px) rotate(180deg) !important;
      }
    }

    svg {
      width: 40px;
      margin-top: -12px;
      height: 40px;
      transform: translateY(-27px) translateX(3px);
    }

    div.content{    
      font-size: 14px;
      font-weight: 200;
      text-align: left;
      padding: 5px 20px;              
      color: #333!important;

      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      div{
        width: 100%;
        text-align: center;
        padding: 40px;
      }

      h3{
        text-align: center;
        margin-top: -10px;
        text-transform: uppercase;
        font-size: 14px;
        margin-bottom: 30px;    
        width: 100%;
      }


    }

  }  



</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { $config } from '../services';

import MILIDIcons from '../components/MILIDIcons.vue';

@Component({
  components: {
    MILIDIcons    
  },
})
export default class Landing extends Vue {
  open = false;
  deferredPrompt: any = {};
  pseudo = '';

  async mounted(){
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();

      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    });
  }

  get config(){
    return $config.store.config;
  }

  beforeRouteEnter(to: any, from: any, next: any) {
    $config.get().then(next)
  }

  onToggle(){
    this.open = !this.open;
  }
  
  onInstall($event) {
    const deferredPrompt = this.deferredPrompt;
    // Show the prompt
    if(!deferredPrompt.prompt) {
      console.log('---DBG alternative install message',$event);
      $event.preventDefault();
      $event.stopPropagation();
      return;
    }

    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt', choiceResult);
      } else {
        console.log('User dismissed the A2HS prompt', choiceResult);
      }
      this.deferredPrompt = {};
    });    
  }

}
</script>
