import isDate from 'lodash.isdate';
import isInteger from 'lodash.isinteger';
import isString from 'lodash.isstring';
import camelCase from 'lodash.camelcase';
import ns from 'src/util/namespace';

/**
 * @class {DiverModel}
 */
export default class DiverModel {

  /**
   *
   * @param  {{firstName: string, lastName: string, dateOfBirth: Date}} obj
   * @return {DiverModel}
   */
  static factory(obj) {
    const {firstName, lastName, dateOfBirth} = Object.keys(obj).reduce((acc, key)  => {
      acc[camelCase(key)] = obj[key];
      return acc;
    }, {});

    return new DiverModel(firstName, lastName, dateOfBirth);
  }

  /**
   *
   * @param {String}  firstName
   * @param {String}  lastName
   * @param {Date}    dateOfBirth
   */
  constructor(firstName, lastName, dateOfBirth) {
    const internal = ns(this);

    if (isString(dateOfBirth) || isInteger(dateOfBirth)) {
      dateOfBirth = new Date(dateOfBirth);
    }

    if (!isString(firstName)) {
      throw new TypeError('Expected first name to be string');
    }
    if (!isString(lastName)) {
      throw new TypeError('Expected last name to be string');
    }
    if (!isDate(dateOfBirth) || isNaN(dateOfBirth)) {
      throw new TypeError('Expected date of birth to be string');
    }

    Object.assign(internal, {
      firstName  : firstName,
      lastName   : lastName,
      dateOfBirth: dateOfBirth
    });
  }

  /**
   * @type {String}
   */
  get firstName() {
    return ns(this).firstName;
  }

  /**
   * @type {String}
   */
  set firstName(value) {
    if (!isString(value)) {
      throw new TypeError('Expected value to be string');
    }

    ns(this).firstName = value;
  }

  /**
   * @type {String}
   */
  get lastName() {
    return ns(this).lastName;
  }

  /**
   * @type {String}
   */
  set lastName(value) {
    if (!isString(value)) {
      throw new TypeError('Expected value to be string');
    }

    ns(this).lastName = value;
  }

  /**
   * @type {Date}
   */
  get dateOfBirth() {
    return ns(this).dateOfBirth;
  }

  /**
   * @type {Date}
   */
  set dateOfBirth(value) {
    if (!isDate(value)) {
      throw new TypeError('Expected value to be string');
    }

    ns(this).dateOfBirth = value;
  }
}
