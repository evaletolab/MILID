import { MILID } from "@/models";
import Vue from "vue";
import axios from 'axios';


class ConfigService {
  // More about store
  // https://fr.vuejs.org/v2/guide/reactivity.html
  private _store: any;
  private _baseUrl = process.env.BASE_URL;
 
  constructor() {
    this._store = Vue.observable({
      config: {}
    });
  }

  get store() {
    return this._store;
  }

  async get(force?: boolean){
    if(!this._store.config.done && !force) {
      const res = await axios.get(this._baseUrl + 'config.json');
      this._store.config = res.data;
      this._store.config.done = true;

      //
      // generate root colors
      this.generateColors(this._store.config.themes);
    }

    return this._store.config;
  }  

  generateColors(themes){
    const root = document.documentElement;
    Object.keys(themes).forEach(theme => {
      const primary = themes[theme].primary
      root.style.setProperty('--theme-'+theme+'-primary',primary);

      const secondary = themes[theme].secondary
      root.style.setProperty('--theme-'+theme+'-secondary',secondary);

      const tertiary = themes[theme].tertiary
      root.style.setProperty('--theme-'+theme+'-tertiary',tertiary);
    });
  }
}

//
// service start with $
export const $config = new ConfigService();