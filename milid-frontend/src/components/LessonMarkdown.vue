
<template>
  <div class="col" v-bind:class="{ scrollDisabled: definitionPopupIsOpen }">
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
    margin-left: 20px;
    width:100%;
    max-width: 640px;
    text-align: left;
  }

  .scrollDisabled{
    touch-action: none;
  }

  .col /deep/ img{
    width:40%;
    display:block;
    margin-left:auto;
    margin-right:auto;
  }

  .col /deep/ li::marker {
    color: red;
    /* content: "• "; */
  }

  .col /deep/ ._definition{
    color: red;
    cursor:pointer;
  }

</style>


<script lang="ts">
/* eslint-disable */
import { Component, Vue, Prop } from 'vue-property-decorator';
import DefinitionPopup from '../components/DefinitionPopup.vue';

import { $module } from '@/services/module-service';

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

    setTimeout(() =>{
      // must be called after dom update...
      this.setupDefinitions();
    }, 100);
  }

  beforeDestroy(){
    this.cleanupDefinitions();
  }

  definitionClickHandler(e: any){
    this.height = getOffset(e.target).top;
    this.definitionPopupIsOpen = true;
    this.definition = this.definitions[0].definition;
  }

  setupDefinitions(){
      const rawRoot = this.$refs['raw_root'] as HTMLElement;
      const definitionElements = rawRoot.querySelectorAll('._definition');
      definitionElements.forEach(e => e.addEventListener('click', this.definitionClickHandler));
  }

  cleanupDefinitions(){
      const rawRoot = this.$refs['raw_root'] as HTMLElement;
      const definitionElements = rawRoot.querySelectorAll('._definition');
      definitionElements.forEach(e => e.removeEventListener('click', this.definitionClickHandler));
  }
}
</script>