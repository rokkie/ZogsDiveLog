import ns from 'zogs-js/src/util/object/namespace';
import isArray from 'zogs-js/src/util/is/array';
import Predicate from './predicate';

/**
 * Result set filter
 */
export default class Filter {

  /**
   * Construct a new filter
   *
   * @param {Predicate[]} [predicates = []] List of predicates
   */
  constructor(predicates = []) {
    const internal = ns(this);

    if (!isArray(predicates)) {
      throw new TypeError('Supplied argument is not an array');
    }

    if (predicates.some(diver => !(diver instanceof Predicate))) {
      throw new TypeError('Supplied argument contains non Predicate');
    }

    Object.assign(internal, {
      predicates: new Set(predicates)
    });
  }

  /**
   * Add a predicate to the filter
   *
   * @param {Predicate} predicate The predicate to add
   */
  addPredicate(predicate) {
    const internal = ns(this);

    if (!(predicate instanceof Predicate)) {
      throw new TypeError('Supplied argument is not a predicate');
    }

    internal.predicates.add(predicate);
  }

  /**
   * Remove a predicate from the filter
   *
   * @param {Predicate} predicate The predicate to remove
   */
  removePredicate(predicate) {
    const internal = ns(this);

    if (!(predicate instanceof Predicate)) {
      throw new TypeError('Supplied argument is not a predicate');
    }

    if (internal.predicates.has(predicate)) {
      internal.predicates.delete(predicate);
    }
  }

  /**
   * Get iterator
   *
   * @example
   * const filter = new Filter([ ... ]);
   * Array.from(filter).forEach(p => p.negate()); // negate all predicates
   *
   * @return {Iterator<Predicate>}
   */
  [Symbol.iterator]() {
    return ns(this).predicates.values();
  }

  /**
   * @type {Object<String, String>}
   */
  get keyval() {
    return Array.from(this)
      .reduce((acc, predicate) => {
        acc[predicate.column] = `${predicate.operator}.${predicate.strval}`;
        return acc;
      }, {});
  }
}
