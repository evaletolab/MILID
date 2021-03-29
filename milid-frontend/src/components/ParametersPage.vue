<template>
  <div>
    <transition name="slide">
      <div v-if="open" class="parameters-page">
        <div class="content">
          <h1>Paramètres</h1>
          <div class="icon">
            <MILIDIcons name="close" color="#000" @wasClicked="close" />
          </div>
          <br>
          <div class="section">
            <p>français/allemand (à venir)</p>
            <Toggle disabled="true" />
          </div>
          <br>
          <h4>infos</h4>
          <div class="section">
            <p>uid: {{uid}}</p>
          </div>
        </div>
      </div>    
    </transition>
    <div v-if="open">
      <div class="backdrop" @click="close"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
    .parameters-page{
        position: fixed;
        width:75%;
        height:100%;
        top:0;
        background-color: white;
        z-index: 40;
    }

    .content{
      padding: 20px;
    }
    
    .backdrop{
      position:fixed;
      background-color: rgba(0, 0, 0, 0.1);
      width:100%;
      height:100%;
      top:0;
      left:0;
      z-index: 39;
      touch-action: none;
    }
    
    .icon{
      position:absolute;
      right: 10px;
      top: 10px;
      width: 30px;
    }

    .slide-enter-active, .slide-leave-active {
      transition: transform .3s ease-in-out;
    }

    .slide-enter, .slide-leave-to {
      transform: translateX(-100%);
    }

    .slide-enter-to, .slide-leave {
      transform: translateX(0);
    }

</style>

<script lang="ts">
/* eslint-disable */
import MILIDIcons from './MILIDIcons.vue';
import Toggle from './Toggle.vue';

import { Component, Prop, Vue } from 'vue-property-decorator';

import { $user } from '../services/user-service';

@Component({
  components: { MILIDIcons, Toggle },
})
export default class ParametersPage extends Vue {

  @Prop() readonly open!: boolean; 

  close(){
    this.$emit('closerequest', null);
  }

  get uid(){
    return $user.getDeviceID();
  }
}

</script>

