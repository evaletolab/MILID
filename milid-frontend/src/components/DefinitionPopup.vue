<template>
    <transition name="fade">
        <div v-if="open" :class="'theme-'+theme">
            <div class="backdrop" @click="close"></div>
            <div :style="{'top':heightStr}" class="horizontal-center">
                <div class="popup primary">
                    <div class="text">
                        <slot></slot>
                    </div>
                    <div class="icon">
                        <MILIDIcons name="close" :color="iconColor" @wasClicked="close" />
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<style lang="scss" scoped>

    .backdrop{
        position:fixed;
        background-color: rgba(0, 0, 0, 0.05);
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

    .popup{
        margin: auto;
        width:80%;
        padding:10px;
        max-width: 600px;
        background-color: white;
        color: white;
        height:auto;
        z-index: 2;
        border-radius: 30px;

        display:flex;
        justify-content: space-between;
    }

    .text{
        width:80%;
        padding-top: 5px;
        padding-left: 20px;
        padding-bottom: 10px;
    }

    .icon{
        width: 30px;
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
import MILIDIcons from './MILIDIcons.vue';

@Component({
    components: { MILIDIcons },
})
export default class DefinitionPopup extends Vue {
    @Prop() open!: boolean;
    @Prop() dataId!: string;
    @Prop() height!: number;
    @Prop() theme!: number;

    get heightStr(){
        return `${this.height}px`;
    }

    get iconColor(){
        return "#ffffff";
    }

    close(){
        this.$emit('closerequest', null);
    }
}
</script>