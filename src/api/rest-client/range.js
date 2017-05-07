import ns from 'src/util/namespace';
import {integer as isInt} from 'zogs-js/src/util/is';

/**
 * Result set range
 */
export default class Range {

  /**
   * Construct a new range
   *
   * @param {Number}  [offset = 0]        Offset of the result set
   * @param {Number}  [limit = Infinity]  Length of the result set
   */
  constructor(offset = 0, limit = Infinity) {
    const internal = ns(this);

    if (!isInt(offset)) {
      throw new TypeError('Offset should be an integer');
    }

    if (0 > offset) {
      throw new RangeError('Offset should be a positive integer');
    }

    if (!isInt(limit) && Infinity !== limit) {
      throw new TypeError('Offset should be an integer or Infinity');
    }

    if (0 > limit) {
      throw new RangeError('Limit should be a positive integer');
    }

    Object.assign(internal, {
      offset: offset,
      limit : limit
    });
  }

  /**
   * @type {Number}
   */
  get offset() {
    return ns(this).offset;
  }

  /**
   * @type {Number}
   */
  set offset(value) {
    if (!isInt(value)) {
      throw new TypeError('Offset should be an integer');
    }

    if (0 > value) {
      throw new RangeError('Offset should be a positive integer');
    }

    ns(this).offset = value;
  }

  /**
   * @type {Number}
   */
  get limit() {
    return ns(this).limit;
  }

  /**
   * @type {Number}
   */
  set limit(value) {
    if (!isInt(value) && Infinity !== value) {
      throw new TypeError('Offset should be an integer or Infinity');
    }

    if (0 > value) {
      throw new RangeError('Limit should be a positive integer');
    }

    ns(this).limit = value;
  }

  /**
   * Returns if the range is configured to get all results
   *
   * @return  {Boolean}
   */
  get isAll() {
    const internal = ns(this);

    return 0 === internal.offset && Infinity === internal.limit;
  }
}
