<template>
    <div class="col" :class="'theme-'+theme" :style="cssVars" >
        <h1 class="primary-on-text" v-html="title"/>
        <div ref="text_root" v-html="textContent" />
        <div ref="raw_root" v-html="svgContent" />
        <div class="footer" />
    </div>
</template>

<style scoped>
  .col{
    /* margin-left: 20px; */
    width:100%;
    max-width: 640px;
    text-align: left;
  }

  .footer{
    height: 80px;
  }
  
  .col /deep/ ._definition{
    color: var(--lesson-color);
    cursor:pointer;
    text-decoration: underline;
  }

</style>


<script lang="ts">
/* eslint-disable */
import { Component, Vue, Prop } from 'vue-property-decorator';

import { $module } from '@/services/module-service';
import { $config } from '@/services/config-service';

import { getOffset } from '@/helpers/utils';

@Component({
  components: {},
})
export default class LessonInfographic extends Vue {
  @Prop() readonly moduleId!:string;
  @Prop() readonly lessonId!:string;
  svgContent = "";
  textContent = "";
  hasTextContent = false;

  interactives = new Map(); 

  definitions: any[] = [];
  
  beforeMount(){
    const lesson = $module.getLessonForModuleAndLessonId(this.moduleId, this.lessonId);
    console.log("lesson", lesson);
    this.svgContent = lesson.svg;
    this.textContent = lesson.html || "";
    this.hasTextContent = this.textContent !== "";
    this.definitions = $module.store.definitions;
  }

  mounted(){
    this.setup();
    this.setupDefinitions();
  }

  beforeDestroy(){
    this.cleanup();
    this.cleanupDefinitions();
  }

  get module() {
    return $module.getModuleWithId(this.moduleId);    
  }
  
  get lesson(){
    return $module.getLessonForModuleAndLessonId(this.moduleId, this.lessonId);
  }

  get title(){
    return this.lesson.title;
  }
  
  get cssVars(){
      return {
        '--lesson-color': $config.store.config.themes[this.module.theme].primary,
      };
  }

  get theme(){
    return this.module.theme;
  }

  hideAllOverlays(){
    for(let entry of this.interactives.values()){
      entry.overlay.classList.add('hidden');
    }
  }

  findNodeWithId(node){
    while(!node.id){
      node = node.parentNode;
    }

    return node.id;
  }

  buttonClickHandler(e){
    // console.log(e.target);
    const id = this.findNodeWithId(e.target);
    console.log("id", id);
    this.hideAllOverlays(); 
    this.interactives.get(id).overlay.classList.remove('hidden');
    e.stopPropagation();
  }

  overlayClickHandler(e){
    this.hideAllOverlays(); 
  }
  
  definitionClickHandler(e: any){
    const definitionId = e.target.dataset.definitionId;
    const height = getOffset(e.target).top;
    const definition = this.definitions.find(def => def.id === definitionId).definition;
    this.$emit('popupRequest', { height, definition });
  }
  
  setupDefinitions(){
      const textRoot = this.$refs['text_root'] as HTMLElement;
      if(!textRoot) return;
      const definitionElements = textRoot.querySelectorAll('._definition');
      definitionElements.forEach(e => e.addEventListener('click', this.definitionClickHandler));
  }

  setup(){
      // const rawRoot = this.$refs['raw_root'] as HTMLElement;
      const buttons = Array.from(document.querySelectorAll('[id^="button"]'));
      const overlays = Array.from(document.querySelectorAll('[id^="overlay"]'));

      document.body.addEventListener('click', this.hideAllOverlays);

      for(let i = 0; i < buttons.length; i++){
        const button = buttons[i];
        const id = button.id;
        const index = id.substring(id.length - 2);
        
        const overlay:HTMLElement = overlays.find(overlay =>  overlay.id.endsWith(index)) as HTMLElement;

        if(overlay){
          overlay.classList.add('hidden');

          button.addEventListener('click', this.buttonClickHandler);
          overlay.addEventListener('click', this.overlayClickHandler);
          this.interactives.set(id, {button, overlay});
        }
      }
  }

  cleanup(){
    document.body.removeEventListener('click', this.hideAllOverlays);

    for(let value of this.interactives.values()){
      value.button.removeEventListener('click', this.buttonClickHandler);
      value.overlay.removeEventListener('click', this.overlayClickHandler);
    }
  }
  
  cleanupDefinitions(){
      const rawRoot = this.$refs['raw_root'] as HTMLElement;
      const definitionElements = rawRoot.querySelectorAll('._definition');
      definitionElements.forEach(e => e.removeEventListener('click', this.definitionClickHandler));
  }
}
</script>