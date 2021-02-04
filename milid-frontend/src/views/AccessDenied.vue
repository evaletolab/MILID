
<template>
  <h2>You don't have the rights to access this resource</h2>
</template>

<style lang="scss" scoped>
  .admin {
    color: black;
  }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NavigationGuardNext, Route } from 'vue-router';


@Component
export default class AccessDenied extends Vue {

  mounted(){
    console.log("mounted");
  }

  beforeRouteUpdate(to: Route, from: Route, next: NavigationGuardNext<Vue>) {
    console.log("before route update from", from);
    next();
  }

}
</script>
