import ns from 'src/util/namespace';
import Filter from './filter';
import Range from './range';
import Selection from './selection';
import Sort from './sort';

/**
 * @class {Query}
 */
export default class Query {

  /**
   * Construct a new Query
   */
  constructor() {
    const internal = ns(this);

    Object.assign(internal, {
      resource : undefined,
      selection: undefined,
      filter   : undefined,
      sort     : undefined,
      range    : undefined
    });
  }

  /**
   * @type {String}
   */
  get resource() {
    return ns(this).resource;
  }

  /**
   * @type {String}
   */
  set resource(value) {
    ns(this).resource = value;
  }

  /**
   * @type {Selection}
   */
  get selection() {
    const internal = ns(this);

    if (!internal.selection) {
      internal.selection = new Selection();
    }

    return internal.selection;
  }

  /**
   * @type {Filter}
   */
  get filter() {
    const internal = ns(this);

    if (!internal.filter) {
      internal.filter = new Filter();
    }

    return internal.filter;
  }

  /**
   * @type {Sort}
   */
  get sort() {
    const internal = ns(this);

    if (!internal.sort) {
      internal.sort = new Sort();
    }

    return internal.sort;
  }

  /**
   * @type {Range}
   */
  get range() {
    const internal = ns(this);

    if (!internal.range) {
      internal.range = new Range();
    }

    return internal.range;
  }
}
