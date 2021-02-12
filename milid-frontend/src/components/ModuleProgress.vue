<template >
  <canvas ref="canvas"></canvas>  
</template>

<script lang="ts">
/* eslint-disable */

import { Component, Prop, Vue } from 'vue-property-decorator';
import { MILID } from '../models';

@Component
export default class ModuleProgress extends Vue {
  private _ctx;
  // @Prop() private module!: MILID.Module;

  @Prop() pipCount!: number;
  @Prop() completedPips!: number;
  @Prop() color!: string;

  created() {
    window.addEventListener("resize", this.onResize);
  }
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  }

  onResize(){

    const canvas = this.$refs.canvas as HTMLCanvasElement;

    const { width, height } = canvas.getBoundingClientRect();
    console.log("resize", width, height, devicePixelRatio);

    canvas.width = Math.floor(width * devicePixelRatio);
    canvas.height = Math.floor(height * devicePixelRatio);

    this.draw();
  }

  mounted() {
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    this._ctx = canvas.getContext('2d');
    this.onResize();
  }

  get devicePixelRatio(){
    // return window.devicePixelRatio;
    return 1;
  }

  draw(){

    const { width, height } = this._ctx.canvas;
    const ctx: CanvasRenderingContext2D = this._ctx;

    console.log("w, h", width, height);
    
    ctx.clearRect(0, 0, width, height);

    const circle = (x, y, r) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
    }

    ctx.save();
    {
      const xMargin = Math.floor(20 * devicePixelRatio);
      const usableWidth = width - (xMargin * 2);  
      const pipOffset = usableWidth / (this.pipCount - 1);
      const pipRadius = Math.floor(4 * devicePixelRatio);
      const lineWidth = Math.floor(6 * devicePixelRatio);

      ctx.translate(0, height / 2);
      {
        // draw pips ( = count of lessons)
        ctx.fillStyle = this.color || "#f00";
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

        ctx.strokeStyle = this.color || "#f00";
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
          const completedRadius = 15;
          const whiteDotRadius = completedRadius - (lineWidth);
          const x = (pipOffset * this.completedPips) + xMargin;
          circle (x, 0, completedRadius);
          ctx.fill(); 
          
          ctx.fillStyle = "white";
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
    border: 1px solid #ddd;
    height: 100%;
  }
</style>
