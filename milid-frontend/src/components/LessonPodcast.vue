<template>
    <div class="col">
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <h1>{{title}}</h1>
        <lottie-animation class="lottie-player" :path="lottiePath" :autoPlay="false" @AnimControl="setAnimController" />

        <audio ref="audioPlayer">
            <source :src="mediaUrl" preload='metadata' type='audio/mpeg; codecs="mp3"'>
        </audio>
        <div class="control">
            <div class="control-icons">
                <MILIDIcons name="podcast-rewind" :theme="theme" />
                <MILIDIcons name="podcast-play" :theme="theme" />
                <MILIDIcons name="podcast-forward" :theme="theme" />
            </div>
        </div>
    </div>
    
</template>


<style scoped>
  .col{
    /* margin-left: 20px; */
    width:100%;
    max-width: 640px;
    text-align: left;
  }

  h1{
      text-transform: uppercase;
      font-size: 15px;
  }

  .control{
      display: flex;
      justify-content: center;

  }

  .control-icons{
      display: flex;
      width:70%;
      height: 35px;
      justify-content: space-between;
  }


</style>


<script lang="ts">
/* eslint-disable */
import { Component, Vue, Prop } from 'vue-property-decorator';
import MILIDIcons from '../components/MILIDIcons.vue';
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
import axios from 'axios';

import { $module } from '@/services/module-service';
import { $config } from '@/services/config-service';

@Component({
  components: { 
      MILIDIcons,
      LottieAnimation,
  }
})
export default class LessonPodcast extends Vue {
    @Prop() readonly moduleId!:string;
    @Prop() readonly lessonId!:string;

    lottieController = null;
    lottieOptions:any = null;

    get lesson(){
        return $module.getLessonForModuleAndLessonId(this.moduleId, this.lessonId);
    }

    get theme(){
        return $module.getModuleWithId(this.moduleId).theme;
    }

    get lottiePath(){
        return `lottie/podcast-theme-${this.moduleId}.json`;
    }


    get title(){
        return this.lesson.title;
    }

    get mediaUrl(){
        return this.lesson.media;
    }

    setAnimController(controller){
        this.lottieController = controller;
    }
  
    async beforeMount(){
    }

    mounted(){
    }

    beforeDestroy(){
    }

}
</script>