import {util} from 'zogs-js';
import * as rest from '../rest/index';

const ns = util.object.namespace;

/**
 * @class Auth
 */
export default class Auth {

  /**
   * Install as Vue plugin
   *
   * @param {Vue}               Vue     Vue instance
   * @param {{apiUrl: string}}  options Key/Value pairs with options
   */
  static install(Vue, options) {
    Vue.prototype.$auth = new Auth(rest);
  }

  constructor(rest) {
    let internal = ns(this);

    Object.assign(internal, {
      rest: rest
    });
  }

  /**
   * Perform login attempt
   *
   * @param  {String}  emailAddress E-mail address as identity
   * @param  {String}  password     Password as credential
   * @return {Promise<Boolean>}
   */
  login (emailAddress, password) {
    return ns(this).rest.login(emailAddress, password)
      .then(success => {
        console.log('YEAH', success);

        return success;
      });
  }
}
