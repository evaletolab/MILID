<template>
  <div class="status">
    <div class="title">{{module.title}}</div>
    <progress max="4" value="2"></progress>    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MILID } from '../models';

@Component
export default class ModuleStatus extends Vue {
  @Prop() private module!: MILID.Module;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .status {
    width: 100vw;
    margin: 10px 50px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    progress {
      // flex: grow (ability to grow) shrink (ability to shrink)  size
      //       
      flex: 0 0 50%;
      -webkit-appearance: none;
      appearance: none;      
      width: 50%;
      height: 5px;
    }

    progress[value] {
      /* Get rid of the default appearance */
      appearance: none;
      
      /* This unfortunately leaves a trail of border behind in Firefox and Opera. We can remove that by setting the border to none. */
      border: none;
      
      /* Add dimensions */
      width: 100%; height: 4px;
      
      /* Although firefox doesn't provide any additional pseudo class to style the progress element container, any style applied here works on the container. */
      background-color: whiteSmoke;
      
      /* Of all IE, only IE10 supports progress element that too partially. It only allows to change the background-color of the progress value using the 'color' attribute. */
      color: #eee;
      
      position: relative;
      margin-left: 10px;
    }    
  }

</style>
