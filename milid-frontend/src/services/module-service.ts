import Vue from "vue";
import axios from 'axios';
import { MILID } from "@/models";

class ModuleService {
  private _store: any;
  private _baseUrl = process.env.BASE_URL;


  get store() {
    return this._store;
  }

  get modules(){
    return this._store.modules;
  }

  get definitions(){
    return this._store.definitions;
  }

  getModuleWithId(id){
    return this._store.modules.find(m => m.id === id);
  }

  getLessonsForModuleWithId(id){
    const module = this.getModuleWithId(id);
    if(!module) return [];

    return module.lessons;
  }

  async getAll(){
    if(!this._store) {
      console.log("loading store");
      const res = await axios.get(this._baseUrl + 'data.json');
      this._store = res.data;
    }
    return this._store;
  }

}

//
// service start with $
export const $module = new ModuleService();