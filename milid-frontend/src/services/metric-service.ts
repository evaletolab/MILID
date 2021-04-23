import { MILID } from "@/models";

import { Vue } from 'vue-property-decorator';

import { $module } from './module-service';
import { $config } from "./config-service";
import { $user } from "./user-service";


import axios from 'axios';
import { BehaviorSubject } from "rxjs";

const defaultAxios = {
  headers: { 
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer abcd'
  }
};

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

  public progressionState: any = Vue.observable({});

  private update$ = new BehaviorSubject<MILIDEvent|null>(null);


  async get() {
    const state = (await $config.storageGet(this.STORAGE_KEY)) as any;
    const keys = Object.keys(state ||{});
    //
    // looking on Airtable
    if(!keys.length){
      await this.sync();
      await $config.storageSet(this.STORAGE_KEY,this.progressionState);
    }    
    Object.assign(this.progressionState,state);
    console.log('--DBG metrics',this.progressionState)
    return this.progressionState;
  }

  //
  // push usage 
  async event(params: MILIDEvent){
    const user = await $user.get();

    //
    // extends params
    const fields = Object.assign({},params,{
      uid:user.id, 
      username:user.name,
      timestamp: (params.timestamp || new Date())
    });

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
    // save php
    try{
      await axios.post("/api/event", fields, defaultAxios);
    }catch(e){
      console.error("unable to update event", e);
    }
    return fields;
  }

  //
  // keep track of all lessons
  async set(params: MILIDEvent){
    this.progressionState[params.lesson] = {
      lesson: params.module,
      state: params.state,
      timestamp: params.timestamp,
      uid:params.uid,
      module: params.module,
      pseudoname: params.username
    };
    
    //
    // notify observers 
    this.update$.next(params);

    return $config.storageSet(this.STORAGE_KEY,this.progressionState)
  }

  async sync() {
    const user = await $user.get();
    //
    // reset
    this.progressionState = {};

    //
    // basic check
    if(!user.id) {
      throw new Error('Unauthorized sync()')
    }

    //
    // load Airtable usage
    try{
      const res= await axios.get("/api/event?filter=" + user.id, defaultAxios);
      if(res.data && res.data.length) {
        res.data.forEach(params => {
          this.progressionState[params.lesson] = {
            lesson: params.module,
            state: params.state,
            timestamp: params.timestamp,
            uid:params.uid,
            module: params.module,
            pseudoname: params.username
          };          
        });
        $config.storageSet(this.STORAGE_KEY,this.progressionState);
      }
      this.update$.next(null);
      return res;
    }catch(e){
      console.error("unable to sync events", e);
      return null;
    }
  }

  async getStats(){
    try{
      const res= await axios.get("/api/stats");
      console.log('-- DBG',res);
      return res.data;
    }catch(e){
      console.error("unable to get stats", e);
      return null;
    }
  }


  onUpdate() {
    return this.update$.asObservable();
  }
}

//
// service start with $
export const $metric = new MetricService();