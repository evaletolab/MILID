import axios from 'axios';

interface MILIDEvent {
  module:string;
  lesson:string;
  state: MILID.LessonState;
  uid: string;
  username: string;
  date: number;
}

class MetricService {
  constructor() {

  }

  async event(params: MILIDEvent){
    throw new Error('Not implemented');
  }

}

//
// service start with $
export const $metric = new MetricService();