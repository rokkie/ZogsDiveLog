import isArray from 'lodash.isarray';
import isBoolean from 'lodash.isboolean';
import isDate from 'lodash.isdate';
import isNumber from 'lodash.isnumber';
import isString from 'lodash.isstring';
import ns from 'src/util/namespace';
import {
  camelCaseToUnderscore,
  underscoreToCamelCase
} from 'zogs-js/src/util/string';
import {not} from './operator';

const boolMap = new Map([
  [true, 'true'],
  [false, 'false']
]);

/**
 * Filter predicate
 */
export default class Predicate {

  /**
   * Construct a new predicate
   *
   * @param {String}                            column            Column name to apply the predicate on
   * @param {String}                            operator          Operator to use as predicate
   * @param {String|Number|Boolean|Array|Date}  value             Value to apply for predicate
   * @param {Boolean}                           [negate = false]  If the operator should be negated
   */
  constructor(column, operator, value, negate = false) {
    const internal = ns(this);

    if (!isString(column)) {
      throw new TypeError('Column should be string');
    }

    if (!isString(operator)) {
      throw new TypeError('Operator should be string');
    }

    if (!isString(value) && !isNumber(value) && !isBoolean(value) && !isArray(value) && !isDate(value)) {
      throw new TypeError('Value should be string, number, boolean, array or date');
    }

    Object.assign(internal, {
      column  : camelCaseToUnderscore(column),
      operator: operator,
      value   : value,
      negated : negate
    });
  }
  /**
   * @type  {String}
   */
  get column() {
    const internal = ns(this);

    return underscoreToCamelCase(internal.column);
  }

  /**
   * @type  {String}
   */
  set column(value) {
    if (!isString(value)) {
      throw new TypeError('Column should be string');
    }

    ns(this).column = value;
  }

  /**
   * @type  {String}
   */
  get operator() {
    const internal = ns(this),
          negation = internal.negated ? `${not}.` : '';

    return `${negation}${internal.operator}`;
  }

  /**
   * @type  {String}
   */
  set operator(value) {
    if (!isString(value)) {
      throw new TypeError('Operator should be string');
    }

    ns(this).operator = value;
  }

  /**
   * @type  {String|Number|Boolean|Array|Date}
   */
  get value() {
    return ns(this).value;
  }

  /**
   * @type  {String|Number|Boolean|Array|Date}
   */
  set value(value) {
    if (!isString(value) && !isNumber(value) && !isBoolean(value) && !isArray(value) && !isDate(value)) {
      throw new TypeError('Value should be string, number, boolean, array or date');
    }

    ns(this).value = value;
  }

  /**
   * @type {Boolean}
   */
  get isNegated() {
    return ns(this).negated;
  }

  /**
   * Negate the predicate
   *
   * @return {void}
   */
  negate() {
    const internal = ns(this);

    internal.negated = !internal.negated;
  }

  /**
   * @type  {String}
   */
  get strval () {
    const value = this.value;

    let ret;
    if (isBoolean(value) && boolMap.has(value)) {
      ret = boolMap.get(value);
    } else if (isArray(value)) {
      ret = value.join(',');
    } else if (isDate(value)) {
      ret = value.toISOString();
    } else {
      ret = value;
    }

    return ret;
  }
}
