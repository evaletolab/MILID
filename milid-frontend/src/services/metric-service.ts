import axios from 'axios';


class MetricService {
  constructor() {

  }

  async event(module:string, lesson:string, state: LessonState, uid: string, username: string, date: number){
    throw new Error('Not implemented');
  }

}

//
// service start with $
export const $metric = new MetricService();