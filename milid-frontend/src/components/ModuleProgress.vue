<template >
  <canvas ref="canvas"></canvas>  
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MILID } from '../models';

@Component
export default class ModuleProgress extends Vue {
  private _ctx;
  @Prop() private module!: MILID.Module;

  mounted() {
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    const parent = canvas.parentNode;
    const styles = getComputedStyle(parent as HTMLElement);
    const w = parseInt(styles.getPropertyValue("width"), 10);
    const h = parseInt(styles.getPropertyValue("height"), 10);

    canvas.width = w;
    canvas.height = h;
    this._ctx = canvas.getContext('2d');

    //
    // draw module progression
    const { width, height } = this._ctx.canvas
    console.log(width, height, this._ctx);

    const padding = 5;
    //this.clear();

    const ctx: CanvasRenderingContext2D = this._ctx;

    ctx.save();
    {
      ctx.translate(0, height / 2);
      this.colors('#eee','red');
      this.drawLine(0, 0, width);
      // this.drawLine(0, height, width);
    }
    ctx.restore();
  }


  colors(fill, stroke) {
    this._ctx.fillStyle = fill;    
    this._ctx.strokeStyle = stroke;
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
