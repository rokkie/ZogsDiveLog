/**
 * Extract query string from a URL
 *
 * @param  {String} url The URL to extract the query string from
 * @return {String}
 */
const extract = url => {
  const idx = url.indexOf('?');
  return (0 <= idx) ? url.slice(idx + 1) : '';
};

/**
 * Convert an object with key/values to a query string
 *
 * @param   {Object}  params  The object to convert
 * @returns {String}
 */
const to = params => {
  return Object.keys(params).reduce((acc, key) => {
    const pair = [key, params[key]]
      .map(encodeURIComponent)
      .join('=');
  
    return acc.concat([pair]);
  }, []).join('&');
};

/**
 * Convert a query string to an object with key/values
 *
 * @param  {String} qs  The query string to convert
 * @return {*}
 */
const from = qs => {
  return qs
    .split('&')
    .filter(val => '' !== val)
    .reduce((acc, kv) => {
      const pair = kv.split('='),
            key  = decodeURIComponent(pair[0]);
      
      acc[key] = (2 > pair.length) ? true : decodeURIComponent(pair[1]);
      return acc;
    }, {});
};

export {extract, to, from};
