<template>
    <div class="col" :class="'theme-'+theme">
        <h1 class="primary-on-text" v-html="title"/>
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

</style>


<script lang="ts">
/* eslint-disable */
import { Component, Vue, Prop } from 'vue-property-decorator';

import { $module } from '@/services/module-service';
import { $config } from '@/services/config-service';


@Component({
  components: {},
})
export default class LessonInfographic extends Vue {
  @Prop() readonly moduleId!:string;
  @Prop() readonly lessonId!:string;
  svgContent = "";

  interactives = new Map(); 

  beforeMount(){
    this.svgContent = $module.getLessonForModuleAndLessonId(this.moduleId, this.lessonId).svg;
  }

  mounted(){
    this.setup();
  }

  beforeDestroy(){
    this.cleanup();
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

  get theme(){
    return this.module.theme;
  }
  
  definitionClickHandler(e: any){
    const definitionId = e.target.dataset.definitionId;
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
    console.log(e.target);
    const id = this.findNodeWithId(e.target);
    console.log("id", id);
    this.hideAllOverlays(); 
    this.interactives.get(id).overlay.classList.remove('hidden');
    e.stopPropagation();
  }

  overlayClickHandler(e){
    this.hideAllOverlays(); 
  }

  setup(){
      const rawRoot = this.$refs['raw_root'] as HTMLElement;
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
}
</script>