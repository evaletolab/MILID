import { MILID } from '@/models';
import { $config } from './config-service';

class UserService {
  private _STORAGE_USER = "milid-user";
  private _user: MILID.User =  { id: false } as MILID.User;

  get user(){
    return this._user;
  }

  async createUser(username: string): Promise<MILID.User> {
    const user = {
      id: this.getDeviceID(),
      name: username,
      created: new Date()
    } as MILID.User;
    
    this._user = user;
    console.log('---DBG',user)
    return await $config.storageSet(this._STORAGE_USER,user) as MILID.User;
  }

  getDeviceID() {
    const navigatorInfo = window.navigator;
    const screenInfo = window.screen;
    let uid = navigatorInfo.mimeTypes.length  + '';
    let ext = '';
    uid += navigatorInfo.userAgent.replace(/\D+/g, '') + '';
    ext += navigatorInfo.plugins.length;
    ext += (navigatorInfo['deviceMemory'] || '');
    ext += screenInfo.height || '';
    ext += screenInfo.width || '';
    ext += screenInfo.pixelDepth || '';
    return this.checksum(uid+ext)+'-'+this.checksum(ext);
  }

  checksum(str) {
    let hash = 0;
    if (str.length == 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }


  async get(): Promise<MILID.User> {
    if(this._user.id) {
      return this._user;
    }

    const user = await $config.storageGet(this._STORAGE_USER) as MILID.User;
    return this._user = user || this._user;
  }
  
}

//
// service start with $
export const $user = new UserService();