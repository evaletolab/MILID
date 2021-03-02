import { MILID } from "@/models";

import { Vue } from 'vue-property-decorator';

import { $module } from './module-service';
import { $config } from "./config-service";
import { $user } from "./user-service";


export interface MILIDEvent {
  module: string;
  lesson: string;
  state: MILID.LessonState;
  uid?: string;
  username?: string;
  timestamp?: number;
}


class MetricService {
  public STORAGE_KEY = "milid-progression";

  public progressionState: any = {};

  constructor() {
    this.progressionState = Vue.observable({});
  }

  async get() {
    const state = (await $config.storageGet(this.STORAGE_KEY)) as any;
    Object.keys(state ||{}).forEach(key => {
      this.progressionState[key] = state[key];
    })
    return this.progressionState;
  }

  //
  // push usage 
  async event(params: MILIDEvent){
    const base = $config.store.config.airtable.base;
    const user = await $user.get();

    //
    // extends params
    const fields = Object.assign({},params,{
      uid:user.id, 
      username:user.name,
      timestamp: (params.timestamp || new Date())
    })

    const createEvent = [{
      "fields": fields
    }];

    console.log('---DBG',fields);
    //
    // check state before to continue 
    const current = this.progressionState[params.lesson];
    if(current && 
      (current.state == params.state || current.state == MILID.LessonState.DONE)) {
     return fields;
    } 

    //
    // save localStorage
    await this.set(fields);

    //
    // save Airtable
    return new Promise((resolve,reject) => {
      if(!fields.uid ||
        !fields.username ||
        !fields.lesson ||
        !fields.module ||
        !fields.state) {
          return reject("Missing ARGs");          
      }
  
      base('usage').create(createEvent,function(err, records) {
        if (err) {
          return reject(err);
        }
        resolve(fields);
      });
    });
  }

  //
  // keep track of all lessons
  async set(params: MILIDEvent){
    this.progressionState[params.lesson] = {
      lesson: params.module,
      state: params.state,
      timestamp: params.date,
      uid:params.uid,
      pseudoname: params.username
    };
    return $config.storageSet(this.STORAGE_KEY,this.progressionState)
  }
}

//
// service start with $
export const $metric = new MetricService();