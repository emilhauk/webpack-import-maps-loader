import { util1, util2 } from './common.js';

export default class App {
  getUtils() {
    util1();
    util2();
  }

  onLogout(redirectUrl = '/') {
    import('user').then(({logout}) => logout(redirectUrl));
  }
}
