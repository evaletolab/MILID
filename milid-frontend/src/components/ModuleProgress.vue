<template >
  <canvas ref="canvas"></canvas>  
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MILID } from '../models';

@Component
export default class ModuleProgress extends Vue {
  private _vueCanvas;
  @Prop() private module!: MILID.Module;

  mounted() {
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    this._vueCanvas = canvas.getContext('2d');

    //
    // draw module progression
    const { clientHeight, clientWidth } = this._vueCanvas.canvas;
    const padding = 5;
    //this.clear();
    this.colors('#eee','red');
    //this.drawLine(padding,clientHeight-padding,(clientWidth - padding*2));
    this.drawLine(0,0,clientWidth);
    this.drawLine(0,clientHeight,clientWidth);
    console.log('----',clientHeight,clientWidth,this._vueCanvas);
  }


  colors(fill, stoke) {
    this._vueCanvas.fillStyle = fill;    
    this._vueCanvas.strokeStyle = stoke;
  }

  drawLine(x,y,len) {
    const { clientHeight, clientWidth } = this._vueCanvas.canvas;

    this._vueCanvas.beginPath();
    this._vueCanvas.lineCap = "round";
    this._vueCanvas.lineWidth = 4;
    // this._vueCanvas.setLineDash([5, 15]);        
    this._vueCanvas.moveTo(x, y);
    this._vueCanvas.lineTo(x+len, y);
    this._vueCanvas.stroke();    
  }

  drawRect(x,y, w, h) {    
    const { clientHeight, clientWidth } = this._vueCanvas.canvas;

    // draw rect
    this._vueCanvas.beginPath();
    this._vueCanvas.rect(x, y, w, h);
    this._vueCanvas.stroke();      
  }  

  drawCircle(x,y,r) {
    const { clientHeight, clientWidth } = this._vueCanvas.canvas;

    this._vueCanvas.beginPath();
    this._vueCanvas.arc(x,y, r, 0, 2 * Math.PI);
    this._vueCanvas.stroke(); 
  }

  clear() {
    const { clientHeight, clientWidth } = this._vueCanvas.canvas;
    // clear canvas
    this._vueCanvas.clearRect(0, 0, clientWidth, clientHeight);
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
