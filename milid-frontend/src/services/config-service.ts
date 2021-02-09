import axios from 'axios';

class ConfigService {
  private _STORAGE_USER = "milid-user";
  private _config: MILID.Config;

  constructor() {
    this._config = false;
  }

  async get(force?: boolean): Promise<any> {
    if(!this._config && !force) {
      this._config = await (axios.get('config.json').then(resp => resp.data));
    }

    return this._config;
  }  
}

//
// service start with $
export const $config = new ConfigService();