<template>
    <canvas ref="canvas"></canvas>  
</template>

<script lang="ts">
//
// https://codepen.io/Gthibaud/pen/ENzXbp
import { Component, Prop, Vue } from 'vue-property-decorator';

import { $config } from "@/services";

import Confetti, { IConfettiOptions, confettiDefaults } from './confetti/Confetti';






@Component
export default class MILIDConfettis extends Vue {
  @Prop({ default : '1'}) private theme!: string;


  confetti;

  get config() {
    return $config.config;
  }

  get colorPrimary() {
    return this.config.themes[this.theme].primary;
  }

  get colorSecondary() {
    return this.config.themes[this.theme].secondary;
  }

  get colorTertiary() {
    return this.config.themes[this.theme].tertiary;
  }

 get pixelRatio(){
    return window.devicePixelRatio || 1;
  }


  mounted() {
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    const parentHeight = this.$parent.$el;

    const { top } = this.$parent.$el.getBoundingClientRect()
    const { width, height } = canvas.getBoundingClientRect();

    canvas.width = Math.floor(width * this.pixelRatio);
    canvas.height = Math.floor(height * this.pixelRatio);

    console.log('---DBG',top, height, document.body.clientHeight - height);

    // canvas.style.display = 'block';
    // canvas.style.top = ((document.body.clientHeight - height*2 ) - 100)+'px' ;
    //
    // options
    // https://github.com/alampros/react-confetti#props
    this.confetti = new Confetti(canvas, {
      numberOfPieces:300,
      recycle:false
    }) as Confetti;

    setTimeout(()=>this.stop(),8000);
  }

  beforeDestroy() {
    this.stop();
  }

  stop(){
    //const canvas = document.getElementById('confettis') as HTMLCanvasElement;
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    canvas.style.display = 'none';

    this.confetti.stop();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  
</style>
