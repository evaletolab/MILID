<template >
  <div class="scroll-snap-container horizontal transition-snap" :class="transitionClass"
       v-if="module">
    <section class="lesson -rendered-item" :class="(lesson.id == $route.params.lesson_id) ? 'active-card':''"
        v-for="(lesson, index) in lessons" :key="lesson.id"
        v-bind:style="getStyle(lesson)"
        v-bind:index="index">
      <h2>{{lesson.title}}</h2>
      <div class="item content ">Yeah!</div>
    </section>

  </div>
  <!--- WHEN MODULE IS NOT READY -->
  <div v-else>    
    <h1>Le Module {{$route.params.module_id}} n'existe pas</h1>
  </div>

</template>

<style lang="scss" scoped>
  section.lesson {
    opacity: 0.5;

    &.active-card {
      opacity: 1;
      transition: opacity 1000ms;
    }    

    .content {
      height: calc( 100vh - 30px );
      width: 100vw;
    }
  }

  // Transition classes
  .transition-initial {
    transition: transform 0s ease;
  }

  .transition-item {
    transition: transform 250ms cubic-bezier(0, 0, 0.2, 1); // ease-out timing function
  }

  .transition-edge {
    transition: transform 500ms ease-out;
  }

  .rendered-item {
    height: 100%;
    min-height: fit-content;
    width: 360px;
    min-width: 100vw;
    padding: 1rem;
    padding-top: 0;
    box-sizing: border-box;

    .sm & {
      width: 100vw;
    }
  }

  .touch-tap-left,
  .touch-tap-right {
    position: absolute;
    top: 0;
    display: flex;
    width: 20%;
    height: 100%;
  }

  .touch-tap-left {
    left: 0;
    justify-content: flex-end;
  }

  .touch-tap-right {
    right: 0;
    justify-content: flex-start;
  }


</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route} from 'vue-router';

import { $config, $module } from '../services';

import Hammer from 'hammerjs';

@Component({
  components: { }
})
export default class Lesson extends Vue {
  private _observer: any;

  //
  // Scroll Card
  currentCard: any;

  //
  // Hammer JS
  upcomingIndex = 0;
  translateX = 0;
  maxTranslateX = 0;
  transitionClass = '';
  isTransitioning = false;
  containerHeight = '100%';
  leftEdgeScale = 0;
  rightEdgeScale = 0;
  isTranslationDisabled = false;

  //
  // vues methods
  beforeRouteEnter(to: Route, from: Route, next: any) {
    const load = [$config.get(),$module.getAll()]
    Promise.all(load).then(next);
  }

  beforeDestroy () {
    this._observer.disconnect();
  }

  mounted () {
    this.observeScroll();
    this.createHammer();
  }


  //
  // computed properties
  get module() {
    return $module.store.modules.find((m: any)=>m.id === this.$route.params.module_id);    
  }

  get lessons() {
    return this.module.lessons;
  }

  get lessonIndex() {
    const id = this.$route.params.lesson_id;
    console.log('----',this.$route.params)
    return this.lessons.findIndex(l => l.id == id);
  }

  //
  // public methods
  createHammer() {
    const touchContainer = this.$el;
    const hammer = new Hammer.Manager(touchContainer, {
      recognizers: [
        [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }],
        [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }],
      ],
    });
    hammer.on('pan swipe', this.cardHandleTouchEvents);

  }

  //
  // only for devel purposes
  getStyle(lesson: any) {
    const styleObj = {
      background: (lesson.color || 'white')
    }
    return styleObj;
  }



  observeScroll() {
    const options = {
      root: this.$el,
      rootMargin: '0px',
      threshold: 0.25
    }
    this.currentCard = this.$el.querySelector('.active-card');

    const observerCallback = (entries: any) => {
      const ratio = 1 / (this.module.lessons.length + 1);
      entries.forEach((entry: any) => {
        const index = entry.target.getAttribute('index');
        // if (entry.intersectionRatio >= 0.7) {
        // }
        if (entry.intersectionRatio >= ratio ) {
          // console.log('----entry',this.$el.scrollLeft);
          // console.log('----entry.target.scrollIntoView', ratio, entry.target.getAttribute('index'));
          // entry.target.scrollLeft = width * index;
          entry.target.classList.add("active-card");
          this.currentCard = entry.target;
        } else {
          entry.target.classList.remove("active-card");
        }
      })
    };

    this._observer = new IntersectionObserver(observerCallback, options)
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      this._observer.observe(section)
    });    
  }

  //
  // HAMMER
  //
  cardIsInfiniteLoop() {
    return !this.cardIsPreviousAvailable();
  }

  cardIsNextAvailable() {
    const width = this.$el.clientWidth;
    return this.$el.scrollLeft < width * (this.module.lessons.length);
  }

  cardIsPreviousAvailable() {
    const width = this.$el.clientWidth;
    return this.$el.scrollLeft >= width;
  }

  cardHandleTouchEvents(e: any) {
    const { deltaX, deltaY, isFinal } = e;


    if (this.isTransitioning) {
      return;
    }

    // Don't respond to gestures that are more vertical than horizontal
    // Unless the gesture started horizontal
    if (
      (Math.abs(deltaX) < 8 || Math.abs(deltaY) - Math.abs(deltaX) > -1) && !this.translateX ) {
      return;
    }

    // console.log('-- hammer',deltaX,deltaY,isFinal);

    if ((!this.cardIsPreviousAvailable() && deltaX > 0) || (!this.cardIsNextAvailable() && deltaX < 0)) {
      this.cardupdateEdgeEffect(deltaX, isFinal);
    } else if (isFinal) {
      this.cardhandleGestureEnd(deltaX);
    } else {
      this.cardHandleGestureMove(deltaX);
    }
  }

  cardHandleGestureMove(deltaX: number) {

    if (Math.abs(deltaX) > Math.abs(this.maxTranslateX)) {
      this.maxTranslateX = deltaX;
    }
    if(!this.translateX) {
      this.translateX = this.$el.scrollLeft;
    }
    
    // this.transitionClass = 'transition-initial';
    // this.transformStyle = `translateX(${deltaX}px)`;
    this.transitionClass = '';
    const width = this.$el.clientWidth;
    const index = (this.$el.scrollLeft / width)|0
    //const scroll = (index * width + width/2 + 1)|0;
    const scroll = (this.$el.scrollLeft - deltaX)|0;
    // console.log('---- delta', index, scroll, this.$el.scrollLeft % width);

    this.$el.scrollLeft = this.translateX - deltaX;
  }

  cardhandleGestureEnd(deltaX?: number) {
    const { translateX, maxTranslateX } = this;

    console.log('---- END scroll', this.currentCard);
    this.transitionClass = '';
    if(this.currentCard) {
      this.currentCard.scrollIntoView({
        behavior: "smooth", 
        block: "start", 
        inline: "nearest"}
      );
    }

    this.translateX = 0;
  }

  cardupdateEdgeEffect(deltaX = 0, isFinal = false) {
    if (isFinal) {
      this.transitionClass = 'transition-edge';
      this.leftEdgeScale = 0;
      this.rightEdgeScale = 0;
    } else {
      this.transitionClass = 'transition-initial';
      const scaleVal = Math.min(0.2 + Math.abs(deltaX) / 50, 1);
      if (deltaX > 0) {
        this.leftEdgeScale = scaleVal;
      }
      if (deltaX < 0) {
        this.rightEdgeScale = scaleVal;
      }
    }
  }

  previousCard(){
    //
  }

  nextCard(){
    //
  }
}
</script>
