import isArray from 'lodash.isarray';
import isPlainObject from 'lodash.isplainobject';
import isString from 'lodash.isstring';
import ns from 'src/util/namespace';
import snakeCase from 'lodash.snakecase';
import {asc, desc} from './order';

/**
 * Column sorter
 */
export default class Sort {

  /**
   * Construct a new sorter
   *
   * @param {Object|Array}  [sorting = {}]  Object hash or list of tuples to sort on
   */
  constructor(sorting = {}) {
    const internal = ns(this);

    Object.assign(internal, {
      map: new Map()
    });

    if (isPlainObject(sorting)) {
      Object.keys(sorting).forEach(key => { this.set(key, sorting[key]); });
    } else if (isArray(sorting)) {
      sorting.forEach(([column, direction]) => { this.set(column, direction); });
    } else {
      throw new TypeError('Expected soring to be object or array');
    }
  }

  /**
   * Set column sorting
   *
   * @param {String}  column    Name of the column to sort on
   * @param {String}  direction Direction to sort in
   */
  set(column, direction) {
    if (!isString(column)) {
      throw new TypeError('Column should be string');
    }

    if (!isString(direction)) {
      throw new TypeError('Direction should be string');
    }

    if (![asc, desc].includes(direction.toLowerCase())) {
      throw new RangeError(`Direction should be ${asc} or ${desc}`);
    }

    ns(this).map.set(snakeCase(column), direction);
  }

  /**
   * Get sorting of a column
   *
   * @param  {String} column  Name of the column to get sorting of
   * @return {String}
   */
  get(column) {
    if (!isString(column)) {
      throw new TypeError('Column should be string');
    }

    const map = ns(this).map;
    return map.has(column) ? map.get(column) : undefined;
  }

  /**
   * Get iterator
   *
   * @example
   * const sort = new Sort();
   * sort.set('foo', 'asc');
   * Array.from(sort).forEach(([col, dir]) => {
   *   console.log(col, dir); // foo asc
   * });
   *
   * @return {Iterator<String, String>}
   */
  [Symbol.iterator]() {
    return ns(this).map.entries();
  }

  /**
   * @type {String}
   */
  get strval() {
    return Array.from(this)
      .reduce((acc, [key, val]) => acc.concat(`${key}.${val}`), [])
      .join(',');
  }
}
