
<template>
  <div class="col" :style="cssVars" v-bind:class="{ scrollDisabled: definitionPopupIsOpen }">
    <DefinitionPopup 
    :open="definitionPopupIsOpen"
    :height="height"
    v-on:closerequest="definitionPopupIsOpen = false"
    >
      {{definition}}
    </DefinitionPopup>
    <div ref="raw_root" v-html="lessonContent" />
  </div>
</template>

<style scoped>
  .col{
    /* margin-left: 20px; */
    width:100%;
    max-width: 100vw;
    text-align: left;
    height: auto;
    padding-bottom: 50px;
  }

  .scrollDisabled{
    touch-action: none;
  }

  .col /deep/ img{
    width:80%;
    display:block;
    margin-left:auto;
    margin-right:auto;
  }

  .col /deep/ li::marker {
    color: var(--lesson-color);
    /* content: "• "; */
  }

  .col /deep/ ._definition{
    color: var(--lesson-color);
    cursor:pointer;
  }

</style>


<script lang="ts">
/* eslint-disable */
import { Component, Vue, Prop } from 'vue-property-decorator';
import DefinitionPopup from '../components/DefinitionPopup.vue';

import { $module } from '@/services/module-service';
import { $config } from '@/services/config-service';

function getOffset(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}

@Component({
  components: {
    DefinitionPopup,
  },
})
export default class LessonMarkdown extends Vue {
  @Prop() readonly moduleId!:string;
  @Prop() readonly lessonId!:string;
  lessonContent = "";
  definitions: any[] = [];
  definition = "";
  definitionPopupIsOpen = false;
  height = 0;
  

  beforeMount(){

    this.lessonContent = $module.getLessonForModuleAndLessonId(this.moduleId, this.lessonId).html;
    this.definitions = $module.store.definitions;
  }

  mounted(){
    this.setupDefinitions();
    this.setupImages();
  }

  beforeDestroy(){
    this.cleanupDefinitions();
  }

  get module() {
    return $module.getModuleWithId(this.moduleId);    
  }

  get cssVars(){
      return {
        '--lesson-color': $config.store.config.themes[this.module.theme].primary,
      };
  }

  definitionClickHandler(e: any){
    const definitionId = e.target.dataset.definitionId;
    this.height = getOffset(e.target).top;
    this.definitionPopupIsOpen = true;
    this.definition = this.definitions.find(def => def.id === definitionId).definition;
  }

  setupDefinitions(){
      const rawRoot = this.$refs['raw_root'] as HTMLElement;
      const definitionElements = rawRoot.querySelectorAll('._definition');
      definitionElements.forEach(e => e.addEventListener('click', this.definitionClickHandler));
  }

  setupImages(){
      const rawRoot = this.$refs['raw_root'] as HTMLElement;
      const imgElements = rawRoot.querySelectorAll('img');

      imgElements.forEach((imgElement) => {
        if(imgElement.dataset.size){
          imgElement.style.width = imgElement.dataset.size;
        }
      });
  }

  cleanupDefinitions(){
      const rawRoot = this.$refs['raw_root'] as HTMLElement;
      const definitionElements = rawRoot.querySelectorAll('._definition');
      definitionElements.forEach(e => e.removeEventListener('click', this.definitionClickHandler));
  }
}
</script>