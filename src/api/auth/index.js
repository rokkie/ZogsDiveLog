import isString from 'lodash.isstring';
import ns from 'src/util/namespace';
import isDate from 'zogs-js/src/util/is/date';
import isEmail from 'zogs-js/src/util/is/email';
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
    if (!options.hasOwnProperty('apiUrl')) {
      throw new Error("Missing option 'apiUrl'"); // eslint-disable-line quotes
    } else if (!isString(options.apiUrl)) {
      throw new TypeError('Expected apiUrl to be string');
    }

    const http = new HttpClient(),
          rest = new RestClient(http, options.apiUrl);

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
      restClient: restClient
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

  /**
   *
   * @param {String}  emailAddress
   * @param {String}  password
   * @param {String}  firstName
   * @param {String}  lastName
   * @param {Date}    dateOfBirth
   */
  signup(emailAddress, password, firstName, lastName, dateOfBirth) {
    if (!isString(emailAddress)) {
      throw new TypeError('Expected e-mail address to be string');
    } else if (!isEmail(emailAddress)) {
      throw new RangeError('E-mail address appears to be invalid');
    }

    if (!isString(password)) {
      throw new TypeError('Expected password to be string');
    } else if (8 > password.length) {
      throw new Error('Password should be at least 8 characters long');
    }

    if (!isString(firstName)) {
      throw new TypeError('Expected first name to be string');
    }

    if (!isString(lastName)) {
      throw new TypeError('Expected last name to be string');
    }

    if (!isDate(dateOfBirth)) {
      throw new TypeError('Expected date of birth to be date');
    } else if (new Date() < dateOfBirth) {
      throw new RangeError('Date of birth cannot be in the future');
    }

    return ns(this).restClient
      .rpc('signup', {
        email_address: emailAddress,
        password     : password,
        first_name   : firstName,
        last_name    : lastName,
        date_of_birth: dateOfBirth
      })
      .then(result => {
        console.log('SIGNUP', result);
      });
  }
}
