import Vue from "vue";
import axios from 'axios';
import { MILID } from "@/models";

class ModuleService {
  private _store: any;
  private _baseUrl = process.env.BASE_URL;

  constructor() {
    this._store = Vue.observable({
      modules: {}
    });
  }

  get store() {
    return this._store;
  }


  async getAll(){
    if(!this._store.modules.length) {
      const res = await axios.get(this._baseUrl + 'modules.json');
      this._store.modules = res.data;
    }
    return this._store.modules;
  }

}

//
// service start with $
export const $module = new ModuleService();