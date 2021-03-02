<template>
    <div class="col" :class="'theme-'+theme">
        <h1 class="primary-on-text" v-html="title"/>
        
        <audio ref="audioPlayer">
            <source :src="mediaUrl" preload='metadata' type='audio/mpeg; codecs="mp3"'>
        </audio>
        
        <div class="lottie-container">
           <lottie-animation class="lottie-player" :path="lottiePath" :autoPlay="false" @AnimControl="setAnimController" />
        </div>

        <div class="duration-container">
            <span class="primary-on-text" >{{elapsedStr}}/{{durationStr}}</span>
        </div>

        <div class="control">
            <div class="control-icons">
                <MILIDIcons name="podcast-rewind" width="35px" :theme="theme" @wasClicked="seekBackwards" />
                <MILIDIcons v-if="isPlaying" width="35px" name="podcast-pause" :theme="theme" @wasClicked="pause"/>
                <MILIDIcons v-else name="podcast-play" width="35px" :theme="theme" @wasClicked="play" />
                <MILIDIcons name="podcast-forward" width="35px" :theme="theme" @wasClicked="seekForwards"  />
            </div>
        </div>

        <button @click="completionHandler">complete me</button>

        <p>status = {{done}}</p>
    </div>   
</template>


<style lang="scss" scoped>
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
      min-height: 320px;
  }

  .lottie-player{
      position:relative;
      left: -20%;
  }

  .duration-container{
      display: flex;
      justify-content: center;
      margin-top: -20px;
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
      cursor:pointer;      
   }
    .control-icons svg{
        width: 35px;
        height: 35px;
    }

</style>


<script lang="ts">
/* eslint-disable */
import { Component, Vue, Prop } from 'vue-property-decorator';
import MILIDIcons from '../components/MILIDIcons.vue';
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
import axios from 'axios';

import { $config, $module, $metric } from '@/services';
import { MILID } from '../models';

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

    get done(){
        return $metric.progressionState[this.lessonId];
    }

    get elapsedStr(){
        return this.formatTime(this.elapsed);
    }

    get durationStr(){
        return this.formatTime(this.duration);
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
    
    formatTime(time){
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        
        const minStr = minutes > 0 ? `${minutes}:` : "";
        const secondsStr = seconds.toString().padStart(2, '0');

        return `${minStr}${secondsStr}`;
    }

    completionHandler($evt){
        $evt.stopPropagation();
        const params = {
            lesson: this.lessonId,
            module: this.moduleId,
            state: MILID.LessonState.DONE
        };
        $metric.event(params);
    }
}
</script>