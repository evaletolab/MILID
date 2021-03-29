<template>
        <div class="container" @click="clickHandler">
           <lottie-animation 
           class="player"
           :loop="false"
           :width="40"
           :path="lottiePath" 
           :autoPlay="false" 
           @AnimControl="setAnimController" />
        </div>
</template>


<style lang="scss" scoped>

  .container{
    margin-top: 20px;
    margin-bottom: 80px;
  }

  .player{
    position:relative;
  }

</style>


<script lang="ts">
/* eslint-disable */
import { Component, Vue, Prop } from 'vue-property-decorator';
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";

@Component({
  components: { 
    LottieAnimation,
  }
})
export default class CompletionButton extends Vue {

    @Prop() completed!:boolean;

    lottieController:any = null;
    lottieOptions:any = null;

    isPlaying = false;

    get lottiePath(){
      return "lottie/validation_animation.json";
    }

    setAnimController(controller){
      this.lottieController = controller;

      // if already complete go to last frame
      if(this.completed){
        const isFrame = true;
        const duration = this.lottieController.duration;
        console.log("controller", this.lottieController, this.lottieController.totalFrames);
        this.lottieController.goToAndStop(this.lottieController.totalFrames - 1, isFrame);
      }else{
        this.lottieController.addEventListener("complete", this.animationCompleteHandler);
      }
    }
  
    mounted(){
      console.log("button is completed ?", this.completed);
    }
    
    beforeDestroy(){
      if(this.lottieController){
        this.lottieController.removeEventListener("complete", this.animationCompleteHandler);
      }
    }

    animationCompleteHandler(){
      // console.log("animation is complete");
      this.isPlaying = false;
      this.$emit('complete');
    }

    clickHandler(){
      if(this.completed || !this.lottieController || this.isPlaying) return;

      this.lottieController.goToAndPlay(1, true);
      this.isPlaying = true;
      // console.log("on click");
    }
}
</script>