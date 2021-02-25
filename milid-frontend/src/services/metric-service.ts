import { MILID } from "@/models";

import { Vue } from 'vue-property-decorator';

import { $module } from './module-service';

interface MILIDEvent {
  module: string;
  lesson: string;
  state: MILID.LessonState;
  uid: string;
  username: string;
  date: number;
}


class MetricService {

  public progressionState: any = {};

  init() {
    this.progressionState = Vue.observable(this.computeInitialValue());
  }

  async event(params: MILIDEvent){
    throw new Error('Not implemented');
  }

  static get localStorageKey(){
    return "progression";
  }

  setCompleted(moduleId, lessonId){
    this.progressionState.modules[moduleId].lessons[lessonId] = MILID.LessonState.DONE;
  }

  buildEmptyProgressValue(){
    const result = { modules: {} }

    for(const module of $module.modules){
      result.modules[module.id] = { lessons: {} };

      for(const lesson of module.lessons){
        result.modules[module.id].lessons[lesson.id] = MILID.LessonState.TODO;
      } 
    }

    return result;
  }

  computeInitialValue(){
    let value = this.buildEmptyProgressValue();
    try{
      const str = window.localStorage.getItem(MetricService.localStorageKey);
      if(str){
        value = JSON.parse(str);
      }
    }catch(e){
      console.error(e);
    }

    return value;
  }
}

//
// service start with $
export const $metric = new MetricService();