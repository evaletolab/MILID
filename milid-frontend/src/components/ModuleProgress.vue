<template >
  <canvas ref="canvas"></canvas>  
</template>

<script lang="ts">
/* eslint-disable */

import { Component, Prop, Vue } from 'vue-property-decorator';
import { $config } from '../services';
import { MILID } from '../models';

@Component
export default class ModuleProgress extends Vue {
  private _ctx;
  // @Prop() private module!: MILID.Module;

  @Prop() readonly pipCount!: number;
  @Prop() readonly completedPips!: number;
  @Prop() readonly theme!: string;
  @Prop({ default: '#fff' }) readonly bkgdColor!: string; 
  @Prop({default:'white'}) readonly color!: string;

  config: MILID.Config = {} as MILID.Config;

  get primary() {
    if(!this.config.themes || !this.theme) {
      return this.color;
    }
    return this.config.themes[this.theme].primary;
  }

  created() {
    window.addEventListener("resize", this.onResize);
  }
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  }

  onResize(){

    const canvas = this.$refs.canvas as HTMLCanvasElement;

    const { width, height } = canvas.getBoundingClientRect();
    console.log("resize", width, height, this.pixelRatio);

    canvas.width = Math.floor(width * this.pixelRatio);
    canvas.height = Math.floor(height * this.pixelRatio);

    this.draw();
  }

  mounted() {    
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    this._ctx = canvas.getContext('2d');
    this.config = $config.store.config;
    this.onResize();
  }

  get pixelRatio(){
    return window.devicePixelRatio;
    // return 1;
  }

  draw(){

    const { width, height } = this._ctx.canvas;
    const ctx: CanvasRenderingContext2D = this._ctx;

    
    ctx.clearRect(0, 0, width, height);

    const circle = (x, y, r) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
    }

    ctx.save();
    {
      const xMargin = Math.floor(20 * this.pixelRatio);
      const usableWidth = width - (xMargin * 2);  
      const pipOffset = usableWidth / (this.pipCount - 1);
      const pipRadius = Math.floor(4 * this.pixelRatio);
      const lineWidth = Math.floor(6 * this.pixelRatio);
      const completedRadius = Math.floor(10 * this.pixelRatio);
      const whiteDotRadius = completedRadius - (lineWidth);

      ctx.translate(0, height / 2);
      {
        // draw pips ( = count of lessons)
        ctx.fillStyle = this.primary || "#f00";
        for(let i = 0; i < this.pipCount; i++){
          const x = xMargin + (i * pipOffset);
          const y = 0;
          if(i > this.completedPips){
            circle(x, y, pipRadius);
            ctx.fill(); 
          }
        }
      }

      // draw progress line if needed
      if(this.completedPips > 0)
      {
        const len = pipOffset * this.completedPips;

        ctx.strokeStyle = this.primary || "#f00";
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineWidth = lineWidth;
        ctx.moveTo(xMargin, 0);
        ctx.lineTo(xMargin + len, 0);
        ctx.stroke();    
      }

      // draw completed index if needed
      if(this.completedPips >= 0)
      {
          const x = (pipOffset * this.completedPips) + xMargin;
          circle (x, 0, completedRadius);
          ctx.fill(); 
          
          ctx.fillStyle = this.bkgdColor;
          circle (x, 0, whiteDotRadius);
          ctx.fill(); 
        }
      }
    ctx.restore();
  }


  drawLine(x,y,len) {

    this._ctx.beginPath();
    this._ctx.lineCap = "round";
    this._ctx.lineWidth = 4;
    // this._ctx.setLineDash([5, 15]);        
    this._ctx.moveTo(x, y);
    this._ctx.lineTo(x+len, y);
    this._ctx.stroke();    
  }

  drawRect(x,y, w, h) {    
    // draw rect
    this._ctx.beginPath();
    this._ctx.rect(x, y, w, h);
    this._ctx.stroke();      
  }  

  drawCircle(x,y,r) {
    this._ctx.beginPath();
    this._ctx.arc(x,y, r, 0, 2 * Math.PI);
    this._ctx.stroke(); 
  }

  clear() {
    const { width, height } = this._ctx.canvas;
    // clear canvas
    this._ctx.clearRect(0, 0, width, height);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
