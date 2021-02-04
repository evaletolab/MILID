import axios from 'axios';

class ConfigService {
  private _config: any;
  constructor() {

  }

  async get(){
    if(!this._config) {
      this._config = await axios.get('assets/config.json');
    }

    return this._config;
  }

}

//
// service start with $
export const $config = new ConfigService();