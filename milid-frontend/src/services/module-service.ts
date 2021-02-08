import axios from 'axios';

class ModuleService {
  private _modules: MILID.Module[];
  constructor() {
    this._modules = [];
  }

  async getAll(): Promise<MILID.Module[]> {
    if(!this._modules.length) {
      this._modules = await axios.get('modules.json');
    }

    return this._modules;
  }

}

//
// service start with $
export const $module = new ModuleService();