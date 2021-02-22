<template>
    <div class="col" :class="'theme-'+theme">
        <h1 class="primary-on-text">{{title}}</h1>
        
        <audio ref="audioPlayer">
            <source :src="mediaUrl" preload='metadata' type='audio/mpeg; codecs="mp3"'>
        </audio>
        
        <div class="lottie-container">
           <lottie-animation class="lottie-player" :path="lottiePath" :autoPlay="false" @AnimControl="setAnimController" />
        </div>

        <div class="duration-container">
            <span class="primary-on-text" >{{elapsed}}/{{duration}}</span>
        </div>

        <div class="control">
            <div class="control-icons">
                <MILIDIcons name="podcast-rewind" :theme="theme" @wasClicked="seekBackwards" />
                <MILIDIcons v-if="isPlaying" name="podcast-pause" :theme="theme" @wasClicked="pause"/>
                <MILIDIcons v-else name="podcast-play" :theme="theme" @wasClicked="play" />
                <MILIDIcons name="podcast-forward" :theme="theme" @wasClicked="seekForwards"  />
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

  .lottie-container{
      display: flex;
      justify-content: center;
      width:170%;
  }

  .lottie-player{
      position:relative;
      left: -20%;
  }

  .duration-container{
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
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

    lottieController:any = null;
    lottieOptions:any = null;

    elapsed = "";
    duration:any = "";

    isPlaying = false;

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

    get audioPlayer(){
        return this.$refs.audioPlayer as HTMLAudioElement;
    }

    mounted(){
        this.audioPlayer.addEventListener('ended', this.onTrackEnded);
        this.audioPlayer.addEventListener('timeupdate', this.onTimeUpdate);
        this.audioPlayer.addEventListener('loadedmetadata', this.onMetaLoaded);
    }

    beforeDestroy(){
        this.audioPlayer.removeEventListener('ended', this.onTrackEnded);
        this.audioPlayer.removeEventListener('timeupdate', this.onTimeUpdate);
        this.audioPlayer.removeEventListener('loadedmetadata', this.onMetaLoaded);
    }

    onMetaLoaded(){
        this.duration = Math.floor(this.audioPlayer.duration);
        this.elapsed = "0";
    }

    onTrackEnded(){
        this.isPlaying = false;
        this.lottieController.pause();
    }

    onTimeUpdate(){
        this.elapsed = `${Math.floor(this.audioPlayer.currentTime)}`;
    }

    pause(){
        if(!this.isPlaying) return;

        this.audioPlayer.pause();
        this.isPlaying = false;
        
        if(this.lottieController){
            this.lottieController.pause();
        }
    }

    play(){
        if(this.isPlaying) return;

        this.audioPlayer.play();
        this.isPlaying = true;
        if(this.lottieController){
            this.lottieController.play();
        }
    }

    seekForwards(){
        this.audioPlayer.currentTime = Math.min(this.audioPlayer.currentTime + 10, this.audioPlayer.duration);
    }

    seekBackwards(){
        this.audioPlayer.currentTime = Math.max(this.audioPlayer.currentTime - 10, 0);
    }
}
</script>