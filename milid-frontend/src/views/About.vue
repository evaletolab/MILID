<template>
  <div class="about">
    <!-- TOOLBAR -->
    <nav class="toolbar">
      <div class="toolbar-row">
        <div class="toolbar-section-start">
          <button class="start icon" @click="onBack()">
            <MILIDIcons name="back" color="white"/>
          </button>
        </div>

        <div class="toolbar-title">
          <MILIDIcons name="logo" width="80" color="white"/>
        </div>        
        
        <div class="toolbar-section-end">
          <button class="icon end">
            <MILIDIcons name="parametres" color="white" @wasClicked="showParameters = true"/>
          </button>
        </div>
      </div>
    </nav>
    
    <ParametersPage :open="showParameters" v-on:closerequest="showParameters = false" />
    
    <h1>À propos</h1>
  </div>
</template>


<style lang="scss" scoped>

  .about{
    background: white;
    color: #333;
    position: absolute;
    width: 100vw;
    height: auto;
    padding-top: 80px;
    .toolbar{
      transform: translateY(0);
      transition: all 200ms;      
      top:0px;
      background-color: var(--md-theme-default-primary);
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
  }  
</style>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import MILIDIcons from '../components/MILIDIcons.vue';
import ParametersPage from '../components/ParametersPage.vue';
import  cfg from '../../package.json';

@Component({
  components: {
    MILIDIcons,
    ParametersPage,
  },
})
export default class About extends Vue { 

  version = cfg.version;

  showParameters = false;
  
  onBack() {
    this.$router.go(-1);
    //this.$router.push({ path: `/module`});
  }

}
</script>
