// HTTP GET method
export const get = 'GET';

// HTTP PUT method
export const put = 'PUT';

// HTTP PATCH method
export const patch = 'PATCH';

// HTTP POST method
export const post = 'POST';

// HTTP DELETE method
export const del = 'DELETE';

/**
 * Check is a HTTP method is supported
 *
 * @param   {String}  method  The methods to check
 * @return  {Boolean}
 */
export const supported = method => [get, put, patch, post, del].includes(method.toUpperCase());
