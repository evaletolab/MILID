<template>
  <div>
    <h1>Module {{$route.params.module_id}}</h1>
    <h2>lesson {{$route.params.lesson_id}}</h2>

  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: { },
})
export default class Lesson extends Vue {}
</script>
