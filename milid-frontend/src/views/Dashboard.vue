
<template>
  <div class="admin">
    <h2>Admin</h2>
  </div>
</template>

<style lang="scss" scoped>
  .admin {
    color: black;
  }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: { },
})
export default class Dashboard extends Vue {}
</script>
