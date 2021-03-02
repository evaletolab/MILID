function isQuestionBtnCorrect(questionBtn){

    if (questionBtn.hasAttribute('data-correct-answer') && !questionBtn.classList.contains('active')) {
        return false;
    }

    if (questionBtn.classList.contains('active') && !questionBtn.hasAttribute('data-correct-answer')) {
        return false;
    }

    return true;
}

export class QuestionSet
{
    answers = new Map();
    id = "";
    
    constructor(id: string){
        this.id = id;
    }

    addAnswer(id, questionBtn){
        this.answers.set(id, questionBtn);
    }

    containsId(id){
        return this.answers.has(id);
    }

    validate(){
        const showErrors = !this.hasCorrectAnswer();

        for(const questionBtn of this.answers.values()){
            const isCorrect = isQuestionBtnCorrect(questionBtn);
            if(showErrors && !isCorrect && questionBtn.classList.contains('active')){
                questionBtn.innerHTML += `<img class="btn-icon red" src="/img/icons/croix.svg" />`;
            }
            
            if(showErrors && !isCorrect && questionBtn.hasAttribute('data-correct-answer')){
                questionBtn.innerHTML += `<img class="btn-icon red" src="/img/icons/vu.svg" />`;
            }

            if(isCorrect && questionBtn.classList.contains('active')){
                questionBtn.innerHTML += `<img class="btn-icon" src="/img/icons/vu.svg" />`;
            }            
            
            questionBtn.disabled = true;
            console.log("state", isCorrect, questionBtn.innerHTML);
        }
    }

    hasCorrectAnswer(){
        for(const questionBtn of this.answers.values()){
            if(!isQuestionBtnCorrect(questionBtn)){
                return false;
            }
        }

        return true;
    }
}
