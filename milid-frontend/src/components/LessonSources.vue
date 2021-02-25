<template>
<!--- SOURCE -->
  <section class="sources primary" :hidden="!lesson.sources" :class="{'open':open}" @click="onToggle">
    <MILIDIcons name="sources" :theme="module.theme" />
    <nav class="handle" hidden></nav>
    <div class="content">
      <h3>sources</h3>
      <div v-html="lesson.sources" />        
    </div>        
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import MILIDIcons from '../components/MILIDIcons.vue';

import { $module } from '@/services/module-service';
import { $config } from '@/services/config-service';

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
    height: 70vh;
    -background-color: var(--theme-1-primary);
    width: calc( 100vw - 10px );
    text-align: center;
    border-radius: 20px 20px 0 0;
    padding: 0 5px;    
    transform: translateY(calc(70vh - 25px));
    transition: all 200ms;      
  }  

  section.sources.open {
    transform: translateY(0);
  }
  section.sources svg {
    width: 22px;
    margin-top: 3px;    
    height: 22px;
    width: 55px;
    margin-top: -27px;
    height: 55px;    
    transform: translateY(-27px) translateX(3px);
  }

  section.sources nav{
    width: 40px;
    height: 3px;
    background: rgba(255, 255, 255,.8);
    margin: auto;
    margin-top: 8px;
  }
  section.sources div.content{    
    font-size: 14px;
    font-weight: 200;
    text-align: left;
    padding: 5px 20px;              
    color: white!important;
  }

  section.sources div.content h3{
    text-align: center;
    margin-top: -10px;
    text-transform: uppercase;
    font-size: 14px;
    margin-bottom: 30px;    
  }

  section.sources div.content  /deep/ a{
    color: white;
    font-weight: 600;
  }

</style>
