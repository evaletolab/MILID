<template>
  <div class="landing">
    <!-- TOOLBAR -->
    <nav class="toolbar">
      <div class="toolbar-row">
        <div class="toolbar-section-start">
          <button class="icon start">
          </button>
        </div>

        <div class="toolbar-title">
          <MILIDIcons name="logo" width="80" color="white"/>
        </div>        

        <div class="toolbar-section-end">
          <button class="icon end">
            <MILIDIcons name="parametres" color="white"/>
          </button>
        </div>
      </div>

    </nav>

    <div class="main">
      <section>
        <h3 v-html="i18n('landing_title1')" />
        <p v-html="i18n('landing_title2')" />
        <img src="@/assets/MILID-logo-minimal.svg" />

        <button class="btn tertiary" @click="onInstall">Ajouter à l'écran d'acceuil</button>
      </section>
      <section class="continue">
        <button class="" @click="onToggle">
          <MILIDIcons name="back" color="white"  class="back"/>
        </button>
        <p v-html="i18n('landing_continue_title')"></p>
      </section>
    </div>
    <section class="bottom " :class="{'open':open,'primary':!open}" @click="onOpen">
      <section class="form">
        <MILIDIcons name="user" theme="1" class="user"/>

        <input v-model="pseudo" @keypress.enter="onEnter(pseudo)"
              placeholder="Pseudo ..."  />

        <a class=""
          :class="{'hidden':(pseudo.length < 4)}"
          @click="onEnter()">
          <div class="icon material-icons">check_circle_outline</div>
          <h4>{{i18n('landing_continue_go')}}</h4>
        </a>
      </section>
    </section>

  </div>
</template>

<style lang="scss" scoped>

  .landing{
    background: white;
    color: #333;
    position: fixed;
    width: 100vw;
    height: 100vh;
    padding-top: 80px;
    .toolbar{
      transform: translateY(0);
      transition: all 200ms;      
      top:0px;
      background-color: var(--theme-1-primary);
      height: 69px;
      -box-shadow: 0 2px 3px -1px rgba(0,0,0,.1);
      &.exited {
        transform: translateY(69px);            
      }

      .toolbar-title{
        img.logo{
          width: 60px;
          transform: translateY(-25px);
          margin-top: 25px;
        }
      }
    }
    
    .version {
      font-weight: 200;
      opacity: .5;
    }

    .main{
      border-radius: 55px;
      padding: 0 10px;
      margin: 0 13px;
      height: calc( 100vh - 90px);    
      color: white;
      background-color: var(--theme-1-secondary);

      >section{
        padding: 20px 40px;
        max-width: 60%;
        max-height: calc( 100vh - 80px );
        p,h3{
          text-align: left;
        }
        img{
          text-align: center!important;
          padding: 26px;
          background-color: var(--theme-1-primary);
          border-radius: 23px;
          width: 80px;
          margin-top: 30px;
          margin-bottom: 50px;
        }
        @media (max-width: 376px) {
          max-width: 100%;        
        }      
     }
     
     section.continue {
       margin-top: 70px;
       button{
        border: none;
        background: transparent;
        width: 65px;     
        height: 65px;
        svg{
          transform: rotate(180deg);
        }    
       }
        p{
          text-align: center;
          margin: 5px;
          font-size: 14px;          
        }

     }
    }
  }

  .btn {
    border-radius: 50px;
    background: var(--theme-1-secondary);
    border: 4px solid white;
    color: white;
    text-align: center;
    padding: 10px 20px !important;
    margin: auto;
    font-size: 14px;
    outline: 0;
    display: block;
  }



  section.bottom {
    background-color: var(--theme-1-tertiary);
    border:1px solid var(--theme-1-tertiary);
    position: fixed;
    bottom: 0;
    left:0;
    height: calc(100vh - 100px);
    width: calc( 100vw - 10px );
    text-align: center;
    border-radius: 20px 20px 0 0;
    padding: 0 5px;    
    transform: translateY(calc(100vh - 90px));
    transition: all 200ms;      
    box-shadow: 0 2px 8px 3px rgba(0, 0, 0, 0.2);


    &.open {
      transform: translateY(10%);

      .form{
        padding: 20px 50px;
        button{
          min-width: 220px;
        }
        svg{
          width: 100px;
          margin-bottom: 30px;
          margin-top: 20px;
        }
        input {
          margin-bottom: 10px;
          line-height: 35px;
          height: 32px;
          font-size: 17px;
          color: #444;
          padding: 10px 15px;
          border-radius: 15px;
          border: 3px solid var(--theme-1-tertiary);
          outline: 0;          
        }
        a{
          display: block;
          .icon{
            font-size: 55px;
            margin-top: 20px;            
          }
          h4{
            margin-top: 0;
          }
        }
      }

    }



  }  



</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { $config, $user } from '../services';

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

  get user() {
    return $user.user;
  }

  beforeRouteEnter(to: any, from: any, next: any) {
    const all = [$config.get(),$user.get()]
    Promise.all(all).then(([config, user])=> {
      if(user.id && user.name) {
        return next('/module');
      }
      next();
    })
  }

  i18n(key) {
    return $config.i18n(key);
  }


  onEnter(username){
    console.log('--- DBG entrer',username)
    $user.createUser(username)
    this.$router.push({path:'/module' });
  }

  onToggle(){
    this.open = !this.open;
  }

  onOpen(){
    this.open = true;
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
