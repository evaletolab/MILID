<template>
  <div class="landing">
    <h1>Landing</h1>
  </div>
</template>

<style lang="scss" scoped>
  .landing {
    color: red;
  }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: { },
})
export default class Landing extends Vue {}
</script>
