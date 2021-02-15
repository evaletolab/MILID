<template>
<!--- TOP -->
<svg v-if="name == 'top'"
   xmlns="http://www.w3.org/2000/svg" 
   :viewBox="viewBox" preserveAspectRatio="none" >
<path
   class="t2" :style="{ fill: colorTertiary, opacity: .5 }"
   d="m 333.62,74.38 c 186.08,72.11 476.8,110.48 668.38,61.1 v -8.87 C 810.14,140.82 578,102.03 417.93,40 251.88,-24.36 94.68,1.64 0,30.25 v 20.9 C 87.89,32.58 208.04,25.71 333.62,74.38 Z"
   id="path18" />
<path
   :style="{ fill: colorTertiary }" 
   d="M 1002,135.47 C 810.43,184.85 519.7,146.49 333.62,74.37 208.04,25.71 87.89,32.58 0,51.15 v 186.94 h 1002 z"
   id="path20" />
</svg>

<!--- BTTOM -->
<svg v-else-if="name == 'bottom'"
   xmlns="http://www.w3.org/2000/svg" 
   :viewBox="viewBox" preserveAspectRatio="none" >

<path
   class="t2"
   d="m 0,68.36 v 27.28 c 9.7,14.66 21.2,25.08 34.71,30.55 346.34,140.31 415.96,14.18 715.14,37.3 140.8,10.88 251.6,45.38 330.14,79.42 v -7.38 C 1031.82,202.72 888.51,118.82 660.91,101.24 383.83,79.83 318.34,195.97 0,68.36 Z"
   id="path6"
   :style="{ fill: colorTertiary, opacity: .5 }" />
<path
   class="t1"
   d="m 0,68.36 c 318.34,127.61 383.83,11.47 660.92,32.88 227.6,17.58 370.91,101.48 419.08,134.29 V 0 H 0 Z"
   id="path8"
   :style="{ fill: colorTertiary }" />

</svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MILIDWave extends Vue {
  @Prop({ default : 'top'}) private name!: string;
  @Prop({ default : '1'}) private theme!: string;
  @Prop({ default : '1000'}) private width!: string;
  @Prop({ default : '235'}) private height!: string;
  @Prop({ default : {}}) private config!: any;


  get viewBox() {
    return "0 0 "+this.width+" "+this.height;
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

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  
  .st0{fill:#6900FF;}
  .st1{fill:#8761FF;}
  .st2{fill:#BBB8FF;}
  .st3{fill:#260063;}
  .st4{fill:#4700B7;}
  .st5{fill:none;}
  .st6{opacity:0.5;fill:#BBB8FF;}
</style>
