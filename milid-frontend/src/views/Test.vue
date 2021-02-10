<template>
  <div class="col" >
    <h1>This is a test page</h1>
    <div ref="raw_root" v-html="lessonContent" ></div>
  </div>
</template>

<style scoped>
  .col{
    margin-right: 10px;
    width:100%;
    max-width: 640px;
    text-align: left;
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
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Test extends Vue {
  lessonContent = "";

  async mounted(){
    const resp = await fetch('/data/data.json');
    const data = await resp.json();

    this.lessonContent = data.lessons[0].html;

    setTimeout(() =>{
      // must be called after dom update...
      this.setupDefinitions();
    }, 100);
  }

  definitionClickHandler(e: any){
    console.log(e, this);
  }

  setupDefinitions(){
      const rawRoot = this.$refs['raw_root'] as HTMLElement;
      const definitionElements = rawRoot.querySelectorAll('._definition');
      console.log("images", definitionElements);
      definitionElements.forEach(e => e.addEventListener('click', this.definitionClickHandler));
  }
}
</script>