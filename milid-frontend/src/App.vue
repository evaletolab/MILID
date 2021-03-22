<template>
  <div id="app">  
    <!-- IOS INSTALL -->
    <div class="overlay-pane" :class="{'overlay-open':displayIosInstall}">
      <div class="install-ios">
        <div class="surface">
          <div class="cancel material-icons" @click="onClose">close</div>
          <div class="label">
            Installez MILID dans votre appareil.<br/> 
            Appuyez sur l'icône de Partage, puis sélectionnez<br/>
            <b>Ajouter à l'écran d'accueil.</b>
          </div>
          <div class="bottom material-icons" >arrow_downward</div>
        </div>          
      </div>
    </div>
    <!-- SW UPDATE -->
    <div class="overlay-pane" :class="{'overlay-open':updateExists}">
      <div class="install-ios">
        <div class="surface">
          
          <div class="label">
            <span v-html="i18n('app_pwa_update')" />
            <span class="update material-icons" @click="onRefreshApp">update</span>
          </div>
        </div>
      </div>
    </div>

    <router-view/>
  </div>
</template>

<style lang="scss">

// 
// global style
@import "./app.scss";

#app {
  font-family: suisse, Sans-Serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>



<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { $config } from './services';

@Component
export default class App extends Vue {
  displayIosInstall = false;
  registration: any = {};
  updateExists = false;


  i18n(key) {
    return $config.i18n(key);
  }

  mounted() {
    //
    // delegate browser install Prompt
    window.addEventListener('installprompt', () => {
      console.log('iOS browser prompt');
      this.displayIosInstall =  true;
      setTimeout(()=>{
        this.displayIosInstall =  false;
      },10000);
    });

    //
    // update app
    window.addEventListener('swUpdated', this.onUpdateAvailable, { once: true })

  }  

  onUpdateAvailable(event){
      this.registration = event.detail
      this.updateExists = true
  }

  onClose(){
    this.displayIosInstall = false;
  }

  onRefreshApp() {
    this.updateExists = false
    // Make sure we only send a 'skip waiting' message if the SW is waiting
    if (!this.registration || !this.registration.waiting) return
    // Send message to SW to skip the waiting and activate the new SW
    this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
  }  
}
</script>



