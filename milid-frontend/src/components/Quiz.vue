
<template>
  <div class="quiz" :style="cssVars">
    <div ref="raw_root" v-html="quizContent" />
    <div class="center">
      <button 
      @click.once="validate" 
      :disabled="!allQuestionsHaveAtLeastOneAnswer" 
      class="validate-btn"
      v-bind:class="{ validateBtnActive: allQuestionsHaveAtLeastOneAnswer }">Validez vos réponses</button>
    </div>
    <p>{{validationText}}</p>
  </div>
</template>


<style scoped>
  .quiz /deep/ .question
  {
    display:flex;
    flex-direction: column;
    width: 70%;
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
    color: white;
    background-color: #aaa;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    margin-top: 40px;
    margin-bottom: 10px;
    cursor: pointer;
    border-radius: 48px;
  }

  .validateBtnActive
  {
    background-color: orange;
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

  .quiz /deep/ .quiz-btn-done
  {
     filter: opacity(0.5);
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

  validationText = "";

  allQuestionsHaveAtLeastOneAnswer = false;

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
    const questionCount = this.questionSets.length;
    let correctAnswersCount = 0;
    
    for(const questionSet of this.questionSets){
      console.log(questionSet.id, questionSet.hasCorrectAnswer());
      if(questionSet.hasCorrectAnswer()){
        correctAnswersCount++;
      }
      questionSet.validate();
      questionSet.setDoneAppearance();
    }

    const plural = correctAnswersCount > 1 ? 's' : '';

    this.validationText = `vous avez ${correctAnswersCount} réponse${plural} correcte${plural}.`

  }

  computeStatus(){
    for(const questionSet of this.questionSets){
      if(!questionSet.hasAtLeastOneAnswer()){
        return false;
      }
    }
    return true;
  }

  quizAnswerHandler(e){
    e.target.classList.toggle('active');
    this.allQuestionsHaveAtLeastOneAnswer = this.computeStatus();
    console.log("status", this.allQuestionsHaveAtLeastOneAnswer);
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