<template >
  <div v-if="module" :class="'theme-'+ module.theme" class="modal module">
    <!-- DEFAULT TOOLBAR -->
    <nav class="toolbar primary">
      <div class="toolbar-row">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button" @click="onBack()">
            <md-icon class="primary">arrow_back</md-icon>
          </md-button>
        </div>

        <div class="toolbar-title title-left">
          <span>M{{module.id}}.{{position}}<br/>
          {{module.title}}</span>
        </div>        

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button">
            <md-icon class="primary">more_vert</md-icon>
          </md-button>
        </div>
      </div>

      <div class="toolbar-row">
        <div class="toolbar-title tight">
          <ModuleProgress 
          :pipCount="count" 
          :pipTotal="count"
          :completedPips="position" 
          color="white" 
          :bkgdColor="config.themes[module.id].primary"
          class="progress" />
        </div>
      </div>        

    </nav>

    <!-- <md-speed-dial class="md-bottom-right ">
      <md-speed-dial-target class="primary">
        <md-icon>add</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button class="md-icon-button">
          <md-icon>note</md-icon>
        </md-button>

        <md-button class="md-icon-button ">
          <md-icon>event</md-icon>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>     -->

    <ContentSwipe :initial="$route.params.lesson_id - 1" :lessons="lessons" @changeCard="renderChange" >
      <section class="lesson rendered-item" 
          ref="container" @touchmove="onScroll" @touchend="onScrollEnd"          
          v-for="(lesson, index) in renderLessons" :key="index" :id="'ctn-'+index"          
          v-bind:index="index">
        <LessonMarkdown v-if="lesson.type == 'MARKDOWN'" :moduleId="module.id" :lessonId="lesson.id" ref="content"  />
        <LessonVideo v-else-if="lesson.type == 'VIDEO'" :moduleId="module.id" :lessonId="lesson.id" ref="content"  />
        <LessonPodcast v-else-if="lesson.type == 'PODCAST'" :moduleId="module.id" :lessonId="lesson.id" ref="content"  />
        <div v-else>
          <h3 class="title">{{lesson.title}}</h3>
          <div class="item type ">
            <MILIDIcons name="podcast" :theme="module.theme"/>
          </div>
        </div>
      </section>

    </ContentSwipe>
  </div>
  <!--- WHEN MODULE IS NOT READY -->
  <div v-else>    
    <h1>Le Module {{$route.params.module_id}} n'est pas disponible</h1>
  </div>

</template>

<style lang="scss" scoped>
  .modal.module{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background: white;
    margin: 0;
    z-index: 2;
    height: 100vh;
    width: 100vw;    
    padding-top:0;    
  }

  .toolbar {
    border-radius: 0 0 18px 18px;
    flex-flow: row wrap;
    position: relative;
    z-index: 2;    
    position: fixed;
    width: 100vw;

    .toolbar-title{
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: -0.01em;
      line-height: 16px;
      margin-top: 0.8em;
      margin-bottom: 0.8em;
      text-transform: uppercase;
      font-weight: 900;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      width: 100%;
      &.tight {
        margin: 0;
      }
      &.title-left{
        text-align: left;
      }
      .progress{
        width: 90px;
        height: 25px;
        margin: auto;        
      }
    }

    .toolbar-row {
      width: 100%;
      min-height: 38px;
      display: flex;
      align-items: center;
      align-content: center;
    }
  }

  .toolbar + .toolbar {
    margin-top: 16px;
  }

  
  .md-speed-dial.md-bottom-right {
    position: fixed;
    z-index: 2;
    right: calc( 50% - 30px );
    margin: auto;
  }

  section.lesson {
    margin-top: 95px;
    padding-bottom: 160px;
    // FIXME activating scroll, disable swipe 
    // overflow-y:auto;
    .title {
      text-align: left;
      color: var(--theme-1-primary);
      margin-top: 63px;      
      text-transform: uppercase;
      font-size: 13px;
      line-height: 15px;      
    }

    .type {
      padding: 80px;
    }

    &.active-card {
      opacity: 1;
      transition: opacity 1000ms;
    }    

    .content {
      height: calc( 100vh - 30px );
      width: 100vw;
    }
  }


</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route} from 'vue-router';
import XScroll from 'xscroll';

import { $config, $module } from '../services';
import { MILID } from '../models';

import ContentSwipe from '../components/ContentSwipe.vue';
import MILIDIcons from '../components/MILIDIcons.vue';
import ModuleProgress from '../components/ModuleProgress.vue';

import MdButton  from 'vue-material';
import MdSpeedDial  from 'vue-material';

import LessonMarkdown from '../components/LessonMarkdown.vue';
import LessonVideo from '../components/LessonVideo.vue';
import LessonPodcast from '../components/LessonPodcast.vue';




Vue.use(MdButton);
Vue.use(MdSpeedDial);

@Component({
  components: { ContentSwipe, MILIDIcons, ModuleProgress, LessonMarkdown, LessonVideo, LessonPodcast }
})
export default class Lesson extends Vue {
  //private _observer: any;
  private renderLessons$: MILID.Lesson[] = [];
  private translateY = -1;
  private xscroll;
  test = [];

  //
  // vues methods
  beforeRouteEnter(to: Route, from: Route, next: any) {
    const load = [$config.get(),$module.getAll()];
    Promise.all(load).then(next);
  }

  beforeDestroy () {
    document.body.style.removeProperty("overflow-y");
  }

  mounted() {    
    document.body.style.setProperty("overflow-y", "hidden");
    const container = this.$refs.container as any;
    // this.initScroll(container);
  }

  //
  // computed properties
  get count() {
    // return this.lessons.length + 1;
    return this.lessons.length;
  }

  get position(){
    return Number.parseInt(this.$route.params.lesson_id || "0");
  }

  get config(){
    return $config.store.config;
  }

  get module() {
    return $module.getModuleWithId(this.$route.params.module_id);    
  }

  get lessons() {
    const lessons = this.module.lessons;
    return lessons;
  }

  get renderLessons() {
    if(!this.renderLessons$.length) {
      const lid = Number.parseInt(this.$route.params.lesson_id || "0");
      const lessons = this.module.lessons;
      // FIXME, findIndex can return -1 !
      const index =  lessons.findIndex(l => l.id == lid);
      const lastIndex = lessons.length - 1;
      const prevIndex = index === 0 ? lastIndex : index - 1;
      const nextIndex = index === lastIndex ? 0 : index + 1;

      this.renderLessons$ = [lessons[prevIndex],lessons[index],lessons[nextIndex]];
    }
    return this.renderLessons$;
  }  


  //
  // look firstChild, skip comment
  getFirstChild(el){
    let firstChild = el.firstChild;
    while(firstChild != null && firstChild.nodeType == 8){ 
      firstChild = firstChild.nextSibling;
    }
    return firstChild;
  }  

  initScroll(container, content?) {
    if(!container) {
      return;
    }
    content = content || this.getFirstChild(container);
    if(this.xscroll) {
      this.xscroll.destroy();
    }

    //
    // FIXME, be sure that html content is rendered
    setTimeout(()=>{
      this.xscroll = new XScroll({
          renderTo: container,
          container: content,
          content: this.getFirstChild(content),
          scrollbarX:false,
          lockX:true,
          lockY:false
      });
      this.xscroll.render();   
    },500);

  }


  renderChange(renderLessons) {
    this.renderLessons$ = [...renderLessons];
    this.$router.replace({ path: `/module/${this.module.id}/lesson/${renderLessons[1].id}`}).catch(()=> {
      //
    }).then(()=>{

      //
      // init virtual scroll position here
      this.$el.scrollTop = 0;
      const container = this.$refs.container as any;
      const content = this.$refs.content as any;
      this.initScroll(container[1],content.$el);
    });
  }

  themePrimary(theme) {
    return this.config.themes[theme].primary;
  }

  themeSecondary(theme) {
    return this.config.themes[theme].secondary;
  }

  themeTertiary(theme) {
    return this.config.themes[theme].tertiary;
  }

  //
  // only for devel purposes
  getStyle(lesson: any) {
    const styleObj = {
      background: (lesson.color || 'white')
    }
    return styleObj;
  }


  onBack() {
    this.$router.go(-1);
    //this.$router.push({ path: `/module`});
  }

  onScroll($event) {
    if($event) return;
    const touch = $event.changedTouches[0];
    const container = this.$refs.container as any;
    if(container.length < 2) {
      return;
    }
    if(this.translateY == -1 ){
      this.translateY = touch.pageY;
      container[1].style.transition = 'transform 0s ease';
      return;
    }

    const deltaY = touch.pageY - this.translateY;
    // this.translateY = touch.pageY;
    container[1].style.transform = 'translateY('+(2*deltaY|0)+'px)';

    // this.$el.scrollBy({ 
    //   top: 0, // could be negative value
    //   left: 0, 
    //   behavior: 'smooth' 
    // });    
  }
  onScrollEnd($event) {
    const touch = $event.changedTouches[0];
    const container = this.$refs.container as any;
    if(container.length < 2) {
      return;
    }
    // const deltaY = (touch.pageY - this.translateY)>1 ? -1:1;
    // container[1].style.transform = 'translateY('+(deltaY*100)+'px)';
    // container[1].style.transition = 'transform  500ms ease-out';
    this.translateY = -1;

  }
}
</script>
