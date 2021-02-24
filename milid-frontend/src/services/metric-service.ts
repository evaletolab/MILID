import { MILID } from "@/models";

import { Vue } from 'vue-property-decorator';

interface MILIDEvent {
  module: string;
  lesson: string;
  state: MILID.LessonState;
  uid: string;
  username: string;
  date: number;
}

class MetricService {
  constructor() {
    // TODO
    
  }

  async event(params: MILIDEvent){
    throw new Error('Not implemented');
  }

}

//
// service start with $
export const $metric = new MetricService();