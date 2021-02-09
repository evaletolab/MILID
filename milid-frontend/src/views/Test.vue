<template>
  <div class="col" >
    <h1>This is a test page</h1>
    <div v-html="lessonContent" ></div>
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
  }
}
</script>