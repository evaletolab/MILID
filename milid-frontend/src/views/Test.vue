
<template>
  <div class="col" v-bind:class="{ scrollDisabled: definitionPopupIsOpen }">
    <h1>This is a test page</h1>
    <router-link to="/home">back to home</router-link>
    <DefinitionPopup 
    :open="definitionPopupIsOpen"
    :height="height"
    v-on:closerequest="definitionPopupIsOpen = false"
    >
      {{definition}}
    </DefinitionPopup>
    <div ref="raw_root" v-html="lessonContent" ></div>
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
import { Component, Vue } from 'vue-property-decorator';
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
export default class Test extends Vue {
  lessonContent = "";
  definitions: any[] = [];
  definition = "";
  definitionPopupIsOpen = false;
  height = 0;
  

  mounted(){

    this.lessonContent = $module.store.lessons[2].html;
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
    const definitionId = e.target.dataset.definitionId;
    console.log("id", definitionId);
    this.height = getOffset(e.target).top;
    this.definitionPopupIsOpen = true;
    this.definition = this.definitions.find(def => def.id === definitionId).definition;
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