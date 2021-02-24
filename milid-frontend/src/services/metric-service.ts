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


interface LessonProgress
{
  id: string;
  state: MILID.LessonState[];
}

interface ModuleProgress{
  id: string;
  lessons: LessonProgress[];
}

interface ProgressState {
  modules: ModuleProgress[];
}

class MetricService {
  constructor() {
    // TODO
    
  }

  async event(params: MILIDEvent){
    throw new Error('Not implemented');
  }

  static get localStorageKey(){
    return "progression";
  }

  buildEmptryProgressValue(): ProgressState{
    const result: ProgressState = { modules: []};

    for(const module of $module.modules){
      const lessons: LessonProgress[] = module.lessons.map(l => {
        return { 
          id: l.id, 
          state: MILID.LessonState.TODO
        };
      });
      const moduleProgress: ModuleProgress = {
        id: module.id,
        lessons: lessons
      }
      result.modules.push(moduleProgress);
    }

    return result;
  }

  computeInitialValue(): ProgressState{
    let value = this.buildEmptryProgressValue();
    try{
      const str = window.localStorage.getItem(MetricService.localStorageKey);
      if(str){
        value = JSON.parse(str) as ProgressState;
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