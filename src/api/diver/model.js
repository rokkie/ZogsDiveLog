import ns from 'zogs-js/src/util/object/namespace';
import underscoreToCamelCase from 'zogs-js/src/util/string/underscore-to-camel-case';

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
      acc[underscoreToCamelCase(key)] = obj[key];
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
    ns(this).dateOfBirth = value;
  }
}
