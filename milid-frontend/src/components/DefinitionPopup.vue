<template>
        <transition name="fade">
    <div v-if="open">
            <div class="backdrop" @click="close"></div>
            <div :style="{'top':heightStr}" class="horizontal-center">
                <div  class="definition">
                    <slot></slot>
                </div>
        </div>
    </div>
        </transition>
</template>


<style lang="scss" scoped>

    .backdrop{
        position:fixed;
        background-color: rgba(0, 0, 0, 0.3);
        width:100%;
        height:100%;
        top:0;
        left:0;
        z-index: 1;
    }

    .horizontal-center {
        position:absolute;
        display: flex; // make us of Flexbox
        justify-content: center; // horizontally centers single line items
        height:auto;
        left:0;
    }  

    .definition{
        margin: auto;
        width:80%;
        padding:10px;
        max-width: 600px;
        background-color: white;
        height:auto;
        z-index: 2;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    components: {},
})
export default class Test extends Vue {
    @Prop() open!: boolean;
    @Prop() dataId!: string;
    @Prop() height!: number;

    get heightStr(){
        return `${this.height}px`;
    }

    close(){
        this.$emit('closerequest', null);
    }
}
</script>