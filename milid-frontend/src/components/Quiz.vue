
<template>
  <div class="quiz" :style="cssVars">
    <div ref="raw_root" v-html="quizContent" />
    <div class="center">
      <button @click.once="validate" class="validate-btn">Validez vos réponses</button>
    </div>
  </div>
</template>


<style scoped>
  .quiz /deep/ .question
  {
    display:flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto
  }

  .center{
    display:flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto
  }

  .validate-btn{
    border: none;
    color: black;
    background-color: orange;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    margin-top: 40px;
    margin-bottom: 40px;
    cursor: pointer;
    border-radius: 48px;

  }
  
  .quiz /deep/ .quiz-btn
  {
    border: none;
    color: black;
    background-color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 24px;

    border-color: var(--lesson-color);
    border-style: solid;
    border-width: 4px;

    position: relative;
  }
  
  /* .quiz /deep/ .quiz-btn:hover
  {
    background-color: var(--lesson-color);
    color: white
  } */

  .quiz /deep/ .active,
  .quiz /deep/ .quiz-btn:hover
  {
    background-color: var(--lesson-color);
    color: white
  }

  .quiz /deep/ .btn-icon
  {
    width: 35px;
    display: inline-block;
    position: absolute;
    right: -15%;
    top: -2px;
  }

  .quiz /deep/ .red
  {
     filter: brightness(3) hue-rotate(0deg) saturate(3);
  }

</style>

<script lang="ts">
/* eslint-disable */
import { Component, Vue, Prop } from 'vue-property-decorator';

import { $module } from '@/services/module-service';
import { $config } from '@/services/config-service';

import { QuestionSet } from '../helpers/QuizModel';

@Component({
  components: { },
})
export default class Quiz extends Vue {
  @Prop() readonly moduleId!:string;
  @Prop() readonly lessonId!:string;

  quizContent = "";
  questionSets: any = []

  beforeMount(){
    this.quizContent = this.lesson.quiz;
  }
  
  mounted(){
    this.setupQuiz();
  }

  beforeDestroy(){
    this.cleanup();
  }
  
  get module() {
    return $module.getModuleWithId(this.moduleId);    
  }

  get lesson(){
    return $module.getLessonForModuleAndLessonId(this.moduleId, this.lessonId);
  }
  
  get cssVars(){
      return {
        '--lesson-color': $config.store.config.themes[this.module.theme].primary,
      };
  }

  validate(){
    console.log("validate quiz");
    for(const questionSet of this.questionSets){
      console.log(questionSet.id, questionSet.hasCorrectAnswer());
      questionSet.validate();
    }

  }

  quizAnswerHandler(e){
    e.target.classList.toggle('active');
  }

  setupQuiz(){
      const rawRoot = this.$refs['raw_root'] as HTMLElement;
      const questionDivs = rawRoot.querySelectorAll('.question');

      let questionSetId = 0;
      let idCounter = 0;

      // for each collection of answers found in a div.question
      // create a question set;
      questionDivs.forEach(questionDiv => {
        const questionSet = new QuestionSet(questionSetId.toString());
       
        questionDiv.querySelectorAll('.quiz-btn').forEach((quizBtn ) => {
          const id = `qust_btn_id_${idCounter++}`;
          quizBtn.id = id;
          (quizBtn as HTMLElement).dataset.questionId = questionSetId.toString();
          quizBtn.addEventListener('click', this.quizAnswerHandler)
          questionSet.addAnswer(id, quizBtn);
        });

        this.questionSets.push(questionSet);
        questionSetId += 1;
      });
  }

  cleanup(){
    const rawRoot = this.$refs['raw_root'] as HTMLElement;
    const questionDivs = rawRoot.querySelectorAll('.question');

    questionDivs.forEach(questionDiv => {
      questionDiv.querySelectorAll('.quiz-btn').forEach(quizBtn => {
        quizBtn.removeEventListener('click', this.quizAnswerHandler)
      });
    });
  }

}
</script>