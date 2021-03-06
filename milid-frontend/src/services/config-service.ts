import { MILID } from "@/models";
import Vue from "vue";
import axios from 'axios';
import Airtable from 'airtable';

const defaultAxios = {
  headers: { 'Cache-Control': 'no-cache' }
};

class ConfigService {
  // More about store
  // https://fr.vuejs.org/v2/guide/reactivity.html
  private _store: any;
  private _baseUrl = process.env.BASE_URL;
  private _isInstalled = false;

  lang = 'fr';

 
  constructor() {
    this._store = Vue.observable({
      config: {}
    });

    //
    // i18n init, default is FR
    const lang = navigator.language || navigator['userLanguage'];   
    if (/^en\b/.test(lang)) {
      this.lang = "fr";
    }
    if (/^fr\b/.test(lang)) {
      this.lang = "fr";
    }
    if (/^de\b/.test(lang)) {
      this.lang = "de";
    }

    window.addEventListener('appinstalled', (evt) => {
      this._isInstalled = true;
    });    

  }

  get store() {
    return this._store;
  }

  get config() {
    return this._store.config;
  }

  i18n(key) {
    if(!this.config.i18n) {
      return '';
    }
    return this.config.i18n[this.lang][key];
  }

  async get(force?: boolean){
    if(!this._store.config.done && !force) {
      const res = await axios.get(this._baseUrl + 'config.json',defaultAxios);
      this._store.config = res.data;
      this._store.config.done = true;

      // console.log('---DBG', JSON.stringify(this._store,null,2))
      //
      // generate root colors
      this.generateColors(this._store.config.themes);

      //
      // configure Airtable instance 
      const air = this._store.config.airtable;
      if(!air || !air.key) {
        console.log('-- DBG missing airtable config');
        return;
      }

      const config = {
        endpointUrl: 'https://api.airtable.com',
        apiKey: air.key
      } as any;
      Airtable.configure(config);
      air.base = Airtable.base(air.base); 
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
      //console.log("'"+primary + "','"+secondary + "','"+tertiary+"'");
    });
  }

  //
  // Detects if device is on iOS
  isIos() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test( userAgent ) ;
  }

  //
  // is Safari
  isSafari() {
    const userAgent = navigator.userAgent.toLowerCase();
    return /^((?!chrome|android).)*safari/i.test(userAgent);
  }

  isAndroid() {
    const userAgent = navigator.userAgent.toLowerCase();
    return /android/i.test(userAgent);
  }

  //
  // Detects if device is in standalone mode
  isInStandaloneMode(){ 
    const $window = window as any;    
    const standalone = (window.matchMedia('(display-mode: standalone)').matches);
    return ($window.navigator.standalone) || standalone || this._isInstalled;
  }


  async storageGet(key: string) {
    return new Promise((resolve, reject) => {
      try {
        const item = localStorage.getItem(key);
        const parsed = JSON.parse(item as string);
        resolve(parsed);
      } catch (err) {
        return reject(err);
      }
    });
  }

  async storageSet(key: string, value: any) {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        resolve(value);
      } catch (err) {
        reject(err);
      }
    });
  }
}


//
// service start with $
export const $config = new ConfigService();