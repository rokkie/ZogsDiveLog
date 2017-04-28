import ns from 'zogs-js/src/util/object/namespace';
import isDate from 'zogs-js/src/util/is/date';
import isEmail from 'zogs-js/src/util/is/email';
import isString from 'zogs-js/src/util/is/string';
import HttpClient from './../http-client/client';
import RestClient from './../rest-client/client';

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

  /**
   * Construct a new Auth
   *
   * @param {RestClient}  restClient  Rest client
   */
  constructor(restClient) {
    let internal = ns(this);

    Object.assign(internal, {
      rest: restClient
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
    return ns(this).restClient
      .rpc('login', {
        email_address: emailAddress,
        password     : password
      })
      .then(success => {
        console.log('YEAH', success);

        return success;
      });
  }
}
