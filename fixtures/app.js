import { logout } from 'user';
import { util1, util2 } from './common.js';

export default class App {
  getUtils() {
    util1();
    util2();
  }

  onLogout(redirectUrl = '/') {
    logout(redirectUrl);
  }
}
