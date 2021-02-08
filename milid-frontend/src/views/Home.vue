<template>
  <div>
    <h1>Home</h1>
    <h2>Module {{module.name}}</h2>

    <ul>
      <li><a :href="`/module/${module.name}/lesson/0`">lesson 0</a></li>
      <li><a :href="`/module/${module.name}/lesson/1`">lesson 1</a></li>
      <li><a :href="`/module/${module.name}/lesson/2`">lesson 2</a></li>
      <li><a :href="`/module/${module.name}/lesson/3`">lesson 3</a></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { $config } from '../services/config-service'


@Component({  
  components: {
  },
})

@Component({
  components: { },
})
export default class Home extends Vue {
  module = {
    name:'my module',
    slug:'my_module',
  }
  config: any;

  constructor(){
    super();
    //
    // should always be preloaded
    this.config = $config.get()
  }

}
</script>
