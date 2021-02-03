
<template>
  <div class="admin">
    <h2>Admin</h2>
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<style lang="scss" scoped>
  .admin {
    color: red;
  }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Landing extends Vue {}
</script>
