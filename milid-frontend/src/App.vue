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

@Component
export default class App extends Vue {
  displayIosInstall = false;

  //
  // Detects if device is on iOS
  isIos() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test( userAgent ) ;
  }

  //
  // Detects if device is in standalone mode
  isInStandaloneMode(){ 
    return ('standalone' in (window as any).navigator) && 
           ((window as any).navigator.standalone);
  }

  mounted() {
    //
    // delegate browser install Prompt
    window.addEventListener('beforeinstallprompt', (deferredPrompt) => {
      // (<any>deferredPrompt).prompt();
      console.log('PWA browser prompt', deferredPrompt);
    });

    //
    // randomly ask for install
    if (this.isIos() && !this.isInStandaloneMode() && Math.random() > .5) {
      this.displayIosInstall =  true;
      setTimeout(()=>{
        this.displayIosInstall =  false;
      },10000);
    }
  }  

  onClose(){
    this.displayIosInstall = false;
  }
}
</script>



