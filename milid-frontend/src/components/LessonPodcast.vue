<template>
    <div class="col">
        <h1>{{title}}</h1>
        <div class="lottie-container">
           <lottie-animation class="lottie-player" :path="lottiePath" :autoPlay="false" @AnimControl="setAnimController" />
        </div>

        <audio ref="audioPlayer">
            <source :src="mediaUrl" preload='metadata' type='audio/mpeg; codecs="mp3"'>
        </audio>
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
        // player.addEventListener('canplaythrough', onCanPlayThrough);
    }

    beforeDestroy(){
        this.audioPlayer.removeEventListener('ended', this.onTrackEnded);
    }

    onTrackEnded(){
        this.isPlaying = false;
    }

    pause(){
        console.log("clik")
        if(!this.isPlaying) return;

        this.audioPlayer.pause();
        this.isPlaying = false;
        
        if(this.lottieController){
            this.lottieController.pause();
        }
    }

    play(){
        console.log("clik")
        if(this.isPlaying) return;

        this.audioPlayer.play();
        this.isPlaying = true;
        if(this.lottieController){
            this.lottieController.play();
        }
    }

    seekForwards(){
        console.log(this.audioPlayer.currentTime, this.audioPlayer.duration);
        this.audioPlayer.currentTime = Math.min(this.audioPlayer.currentTime + 10, this.audioPlayer.duration);
    }

    seekBackwards(){
        console.log(this.audioPlayer.currentTime, this.audioPlayer.duration);
        this.audioPlayer.currentTime = Math.max(this.audioPlayer.currentTime - 10, this.audioPlayer.duration);

    }

}
</script>