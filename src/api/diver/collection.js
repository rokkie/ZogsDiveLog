import ns from 'src/util/namespace';
import isArray from 'zogs-js/src/util/is/array';
import DiverModel from './model';

/**
 * {DiverCollection}
 */
export default class DiverCollection {

  /**
   *
   * @param {DiverModel[]}  divers
   */
  constructor(divers) {
    const internal = ns(this);

    if (!isArray(divers)) {
      throw new TypeError('Supplied argument is not an array');
    }

    if (divers.some(diver => !(diver instanceof DiverModel))) {
      throw new TypeError('Supplied argument contains non DiverModel');
    }

    Object.assign(internal, {
      data: new Set(divers)
    });
  }

  /**
   *
   * @return {Iterator<DiverModel>}
   */
  [Symbol.iterator]() {
    return ns(this).data.values();
  }
}
