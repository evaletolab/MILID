<template>
<!--- SOURCE -->
  <section class="sources " :hidden="!lesson.sources" :class="{'open primary':open,'primary':!open}" @click="onToggle">
    <MILIDIcons name="sources-bar" :theme="module.theme" />
    <nav class="handle" hidden></nav>
    <div ref="container" class="content">
      <h3 class="hide">sources</h3>
      <div v-html="lesson.sources" />
      <div style="height:50px" />
    </div>        
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import MILIDIcons from '../components/MILIDIcons.vue';

import { $module } from '@/services/module-service';
import { $config } from '@/services/config-service';

import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

@Component({
  components: {
    MILIDIcons    
  },
})
export default class LessonSources extends Vue {
  @Prop() readonly moduleId!: string;
  @Prop() readonly lessonId!: string;

  open = false;

  get module() {
    return $module.getModuleWithId(this.moduleId);    
  }

  get lesson(){
    const lesson = $module.getLessonForModuleAndLessonId(this.moduleId, this.lessonId);
    // console.log('--DBG',lesson.sources);
    return lesson;
  }

  get theme(){
      return $module.getModuleWithId(this.moduleId).theme;
  }


  get colorPrimary() {
    return $config.store.config.themes[this.theme].primary;
  }

  get colorSecondary() {
    return $config.store.config.themes[this.theme].secondary;
  }

  get colorTertiary() {
    return $config.store.config.themes[this.theme].tertiary;
  }


  onToggle(){
    this.open = !this.open;
    if(this.open){
      setTimeout(() => {

        const container = this.$refs.container as any;
        disableBodyScroll(container);
      }, 200);
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  section.sources {
    color: white;
    position: fixed;
    bottom: 0;
    left:0;
    height: calc(100vh - 100px);
    width: calc( 100vw - 10px );
    text-align: center;
    border-radius: 20px 20px 0 0;
    padding: 0 5px;    
    transform: translateY(calc(100vh - 120px));
    transition: all 200ms;      
  }  

  section.sources.open {
    transform: translateY(180px);
  }
  section.sources svg {
    width: 55px;
    margin-top: -27px;
    width: auto;
    margin-top: 10px;
    height: 55px;
    transform: translateY(-64px) translateX(0px);
  }

  section.sources nav{
    width: 40px;
    height: 3px;
    background: rgba(255, 255, 255,.8);
    margin: auto;
    margin-top: 8px;
    display: none;
  }
  section.sources div.content{    
    font-size: 14px;
    font-weight: 200;
    text-align: left;
    padding: 5px 20px;              
    color: white!important;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    margin-top: -45px;
    height: 65%;

  }

  section.sources div.content h3{
    text-align: center;
    text-transform: uppercase;
    font-size: 14px;
    margin-bottom: 30px;    
  }

  section.sources div.content  /deep/ a{
    color: white;
    font-weight: 600;
  }

</style>
