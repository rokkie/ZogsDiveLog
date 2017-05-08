
const map = new WeakMap();

/**
 * Create a namespace for an object
 *
 * @param  {Object} obj Object to create namespace for
 * @return {Object}     Namespace
 */
export default (obj) => {
  if (!map.has(obj)) {
    map.set(obj, {});
  }
  
  return map.get(obj);
};
