import ns from 'zogs-js/src/util/object/namespace';
import underscoreToCamelCase from 'zogs-js/src/util/string/underscore-to-camel-case';

/**
 *
 */
export default class DiverModel {

  /**
   *
   * @param  {{firstName: string, lastName: string, dateOfBirth}} obj
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

  get firstName() {
    return ns(this).firstName;
  }

  set firstName(value) {
    ns(this).firstName = value;
  }

  get lastName() {
    return ns(this).lastName;
  }

  set lastName(value) {
    ns(this).lastName = value;
  }

  get dateOfBirth() {
    return ns(this).dateOfBirth;
  }

  set dateOfBirth(value) {
    ns(this).dateOfBirth = value;
  }
}
