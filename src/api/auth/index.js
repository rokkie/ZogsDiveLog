import {util} from 'zogs-js';
import * as rest from '../rest/index';

const ns = util.object.namespace;

export default class Auth {

  // eslint-disable-next-line no-unused-vars
  static install(Vue, options) {
    Vue.prototype.$auth = new Auth(rest);
  }

  constructor(rest) {
    let internal = ns(this);

    Object.assign(internal, {
      rest: rest
    });
  }

  login (emailAddress, password) {
    return ns(this).rest.login(emailAddress, password)
      .then(success => {
        console.log('YEAH', success);

        return success;
      });
  }
}
