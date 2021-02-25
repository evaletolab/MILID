
<template>
  <div class="lesson-video" :class="'theme-'+module.theme" :style="cssVars">  
    <h4 v-html="lesson.title" />
    <div class="player">
      <svg viewBox="0 0 200 200" class="video-edges">
      <path class="st0" d="M177.14,129.13l-0.69-0.7c-0.43-0.43-13.01-13.23-13.01-13.23l-9.31-9.31c-2.09-2.1-2.09-5.52,0-7.62
        c1.01-1.02,2.36-1.58,3.79-1.58c1.43,0,2.78,0.56,3.79,1.58l5.32,5.32c1.47,1.47,3.41,2.28,5.49,2.28c2.07,0,4.02-0.81,5.49-2.28
        c3.02-3.03,3.02-7.96,0-10.99l-0.87-0.88l-9.29-9.31c-0.06-0.06-0.12-0.11-0.18-0.15l-12.63-12.63l0.02-0.02l-38.46-38.46
        L99.58,14.14c-1.26-0.84-2.74-1.3-4.29-1.3c-2.07,0-4.02,0.81-5.49,2.28c-3.02,3.03-3.02,7.96,0,10.99l0.59,0.59
        c2.09,2.1,2.09,5.52,0,7.62c-1.01,1.02-2.36,1.58-3.79,1.58c-1.4,0-2.72-0.54-3.73-1.51c0,0-11.19-10.74-11.81-11.37l-8.87-8.87
        c-1.26-0.84-2.74-1.3-4.29-1.3c-2.07,0-4.02,0.81-5.49,2.28c-3.02,3.03-3.02,7.96,0,10.99l0.59,0.59c2.09,2.1,2.09,5.52,0,7.62
        c-1.01,1.02-2.36,1.58-3.79,1.58c-1.4,0-2.72-0.54-3.73-1.51l-9.94-9.98c-1.47-1.47-3.41-2.28-5.48-2.28c0,0,0,0,0,0
        c-2.07,0-4.02,0.81-5.49,2.28c-3.02,3.03-3.02,7.96,0,10.99L36.57,47.4l9.31,9.31c2.09,2.1,2.09,5.52,0,7.62
        c-1.01,1.02-2.36,1.58-3.79,1.58c-1.43,0-2.78-0.56-3.79-1.58L32.96,59c-1.47-1.47-3.41-2.28-5.49-2.28c-2.07,0-4.02,0.81-5.49,2.28
        c-3.02,3.03-3.02,7.96,0,10.99l0.87,0.88l0.69,0.7c0.28,0.43,0.62,0.84,1,1.22L36.57,84.8l9.31,9.31c2.09,2.1,2.09,5.52,0,7.62
        c-1.01,1.02-2.36,1.58-3.79,1.58c-1.43,0-2.78-0.56-3.79-1.58l-5.32-5.32c-1.47-1.47-3.41-2.28-5.49-2.28
        c-2.07,0-4.02,0.81-5.49,2.28c-3.02,3.03-3.02,7.96,0,10.99l0.87,0.88l9.29,9.31c0.06,0.06,0.12,0.11,0.18,0.15l12.63,12.63
        l-0.02,0.02l38.46,38.46l17.01,17.01c1.26,0.84,2.74,1.3,4.29,1.3c2.07,0,4.02-0.81,5.49-2.28c3.02-3.03,3.02-7.96,0-10.99
        l-0.59-0.59c-2.09-2.1-2.09-5.52,0-7.62c1.01-1.02,2.36-1.58,3.79-1.58c1.4,0,2.72,0.54,3.73,1.51c0,0,11.1,10.66,11.81,11.37
        l8.87,8.87c1.26,0.84,2.74,1.3,4.29,1.3c2.07,0,4.02-0.81,5.49-2.28c3.02-3.03,3.02-7.96,0-10.99l-0.59-0.59
        c-2.09-2.1-2.09-5.52,0-7.62c1.01-1.02,2.36-1.58,3.79-1.58c1.4,0,2.72,0.54,3.73,1.51l9.94,9.98c1.46,1.47,3.41,2.28,5.48,2.28
        c0,0,0,0,0,0c2.07,0,4.02-0.81,5.49-2.28c3.02-3.03,3.02-7.96,0-10.99l-12.02-12.01l-9.31-9.31c-2.09-2.1-2.09-5.52,0-7.62
        c1.01-1.02,2.36-1.58,3.79-1.58c1.43,0,2.78,0.56,3.79,1.58l5.32,5.32c1.47,1.47,3.41,2.28,5.49,2.28c2.07,0,4.02-0.81,5.49-2.28
        c3.02-3.03,3.02-7.96,0-10.99L177.14,129.13z"/>
      <g>
        <foreignObject>
        </foreignObject>
      </g>

      </svg>
      <canvas ref="canvas" @click="onToggle"></canvas>

    </div>

    <video ref="video"  playsinline  hidden>
        <source :src="mediaUrl"  type='video/mp4'>
    </video>


    <div class="duration-container">
        <span class="primary-on-text" >{{elapsedStr}}/{{durationStr}}</span>
    </div>

    <div class="control">
        <div class="control-icons">
            <MILIDIcons name="podcast-rewind" width="35px" :theme="theme" @wasClicked="onSeekBackwards" />
            <MILIDIcons v-if="isPlaying" name="podcast-pause" width="35px" :theme="theme" @wasClicked="onPause"/>
            <MILIDIcons v-else name="podcast-play" width="35px" :theme="theme" @wasClicked="onPlay" />
            <MILIDIcons name="podcast-forward" width="35px" :theme="theme" @wasClicked="onSeekForwards"  />
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .st2{fill:var(--primary);}
  .st1{fill:#fff;}
  .st0{fill:var(--tertiary);}

  .lesson-video{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;

  }

  video{
    display: none;
    width: 100%;
    margin-left: auto;
    margin-right: auto;    
    &::-webkit-full-screen{
      display: none;
    }

    &::-webkit-media-controls {
     display:none !important;
    }

    &::-webkit-media-controls {
      display:none !important;
    }
  }

  .player{
    position: relative;
    margin-left: -25px;
    margin-right: -25px;    
    width: 100vw;

    .video-edges{
      width: 100%;
      height: 100%;
      transform: scale(1.2);
    }

    

    canvas {
      width: calc( 100% - 90px);
      height: calc( 100% - 90px);
      border-radius: 30px;
      background-color: var(--tertiary);
      margin: auto;    
      position: absolute;
      left: 50%;
      top: 50%;    
      transform: translate3d(-50%,-50%,0);

    }

  }

  .duration-container{
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      width: 100%;
      margin-top: -20px;
      z-index: 1;
      font-family: monospace;      
  }
  
  .control{
      display: flex;
      justify-content: center;
      width: 100%;
      transform: scale(.8);
      svg{
        width: 35px;
        height: 35px;
      }
  }

  .control-icons{
      display: flex;
      width:70%;
      height: 35px;
      justify-content: space-between;
      cursor:pointer;
  }


</style>


<script lang="ts">
/* eslint-disable */
import { Component, Vue, Prop } from 'vue-property-decorator';
import MILIDIcons from '../components/MILIDIcons.vue';

import { $module } from '@/services/module-service';
import { $config } from '@/services/config-service';

@Component({
  components: {
    MILIDIcons    
  },
})
export default class LessonVideo extends Vue {
  @Prop() readonly moduleId!:string;
  @Prop() readonly lessonId!:string;

  duration = 0;
  elapsed = "0";
  isPlaying = false;

  get lesson() {
    return $module.getLessonForModuleAndLessonId(this.moduleId,this.lessonId);
  }

  get module() {
    return $module.getModuleWithId(this.moduleId);    
  }

  get theme(){
      return $module.getModuleWithId(this.moduleId).theme;
  }

  get cssVars() {
    const theme = $config.store.config.themes[this.theme];

    return {
      '--primary': theme.primary,
      '--secondary': theme.secondary,
      '--tertiary': theme.tertiary
    }
  }  

  get mediaUrl() {
    // return "http://media.w3.org/2010/05/sintel/trailer.mp4";
    return this.lesson.media;
  }


  get elapsedStr(){
      return this.formatTime(this.elapsed);
  }

  get durationStr(){
      return this.formatTime(this.duration);
  }

  get video(){
      return this.$refs.video as HTMLVideoElement;
  }

  mounted(){
      this.video.addEventListener('ended', this.onTrackEnded);
      this.video.addEventListener('timeupdate', this.onTimeUpdate);
      this.video.addEventListener('loadedmetadata', this.onMetaLoaded);

      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * 1);
      canvas.height = Math.floor(height * 1);
      const ctx = canvas.getContext('2d');


      //
      // crop video inside canvas
      // respect ratio relative to height
      this.video.addEventListener('play', function() {
        const $this = this; //cache
        const videoWidth = $this.videoWidth;
        const videoHeight = $this.videoHeight;
        const ratio = canvas.height / videoHeight;

        const sx = (videoWidth*ratio - canvas.width) / 2;
        const sy = (videoHeight*ratio - canvas.height) / 2;
        // console.log('--DBG',videoWidth,videoHeight, ratio);
        // console.log('--DBG',videoWidth*ratio,videoHeight*ratio, ratio);
        // console.log('--DBG',sx,sy,videoWidth*ratio,videoHeight*ratio, ratio);
        (function loop() {
          if (ctx && !$this.paused && !$this.ended) {
            ctx.drawImage($this, 
              sx,sy,videoWidth-sx*2,videoHeight-sy*2,
              0, 0,canvas.width,canvas.height);
            setTimeout(loop, 1000 / 30); // drawing at 30fps
          }
        })();
      }, false);
      console.log('--DBG',this.lesson)
  }

  beforeDestroy(){
      this.video.removeEventListener('ended', this.onTrackEnded);
      this.video.removeEventListener('timeupdate', this.onTimeUpdate);
      this.video.removeEventListener('loadedmetadata', this.onMetaLoaded);
  }

  onMetaLoaded(){
      this.duration = Math.floor(this.video.duration);
      this.elapsed = "0";
  }

  onTrackEnded(){
      this.isPlaying = false;
  }

  onTimeUpdate(){
      this.elapsed = `${Math.floor(this.video.currentTime)}`;
  }

  onToggle() {
    if(this.isPlaying) {
      this.onPause();
    } else {
      this.onPlay();
    }
  }

  onPause(){
    if(!this.isPlaying) return;

    this.video.pause();
    this.isPlaying = false;
  }

  onPlay() {
    if(this.isPlaying) return;

    this.video.play();
    this.isPlaying = true;
  }

  onSeekForwards(){
    this.video.currentTime = Math.min(this.video.currentTime + 10, this.video.duration);
  }

  onSeekBackwards(){
    this.video.currentTime = Math.max(this.video.currentTime - 10, 0);
  }
  
  formatTime(time){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    
    const minStr = minutes > 0 ? `${minutes}:` : "";
    const secondsStr = seconds.toString().padStart(2, '0');

    return `${minStr}${secondsStr}`;
  }

}
</script>