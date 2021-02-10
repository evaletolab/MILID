import { MILID } from '@/models';

class UserService {
  private _STORAGE_USER = "milid-user";
  private _user: MILID.User;

  constructor() {
    this._user = { id: false } as MILID.User;
  }

  createUser(name: string) {
    const user = {
      id: this.getDeviceID(),
      name: name,
      created: new Date()
    } as MILID.User;

    try {
      const storage = JSON.stringify(user);
      localStorage.setItem(this._STORAGE_USER,storage);
      this._user = user ;
    } catch(e) {
      //
    }    


  }

  getDeviceID() {
    const navigatorInfo = window.navigator;
    const screenInfo = window.screen;
    let uid = navigatorInfo.mimeTypes.length  + '';
    uid += navigatorInfo.userAgent.replace(/\D+/g, '') + '';
    uid += navigatorInfo.plugins.length;
    uid += screenInfo.height || '';
    uid += screenInfo.width || '';
    uid += screenInfo.pixelDepth || '';
    return uid;
  }


  getUser() {
    try {
      const storage = localStorage.getItem(this._STORAGE_USER);
      this._user = JSON.parse(storage||'') as MILID.User;
    } catch(e) {
      //
    }    
    return this._user;
  }
  
}

//
// service start with $
export const $user = new UserService();