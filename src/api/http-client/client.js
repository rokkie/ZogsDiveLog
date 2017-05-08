import isString from 'lodash.isstring';
import toQueryString from 'zogs-js/src/util/url/to-query-string';
import * as errors from './error';
import * as methods from './method';
import {object as isObject} from 'zogs-js/src/util/is';

/**
 * HTTP Client
 */
export default class HttpClient {

  /**
   * Construct a new HTTP Client
   */
  constructor() {
  }

  /**
   * Make a GET request
   *
   * @param  {String} uri             Request URI
   * @param  {Object} [params = {}]   Request parameters
   * @param  {Object} [headers = {}]  Request headers
   * @return {Promise<Object>}
   */
  doGet (uri, params = {}, headers = {}) {
    return this.request(`${uri}?${toQueryString(params)}`, methods.get, '', headers);
  }

  /**
   * Make a PUT request
   *
   * @param  {String} uri             Request URI
   * @param  {Object} data            Request data
   * @param  {Object} [headers = {}]  Request headers
   */
  doPut (uri, data, headers = {}) {
    return this.request(uri, methods.put, JSON.stringify(data), headers);
  }

  /**
   * Make a PATCH request
   *
   * @param  {String} uri             Request URI
   * @param  {Object} data            Request data
   * @param  {Object} [headers = {}]  Request headers
   */
  doPatch (uri, data, headers = {}) {
    return this.request(uri, methods.patch, JSON.stringify(data), headers);
  }

  /**
   * Make a POST request
   *
   * @param  {String} uri   Request URI
   * @param  {Object} data  Request data
   * @return {Promise<Object>}
   */
  doPost (uri, data) {
    return this.request(uri, methods.post, JSON.stringify(data));
  }

  /**
   * Make a DELETE request
   *
   * @param  {String} uri             Request URI
   * @param  {Object} [headers = {}]  Request headers
   */
  doDelete (uri, headers = {}) {
    return this.request(uri, methods.del, undefined, headers);
  }

  /**
   * Perform HTTP request
   *
   * @param  {String}  uri            Request URI
   * @param  {String}  method         Request method
   * @param  {String}  [body = '']    Request body
   * @param  {Object}  [headers = {}] Request headers
   * @return {Promise<Object>}
   */
  request(uri, method, body = '', headers = {}) {
    if (!isString(uri)) {
      throw new TypeError('Expected URI to be string');
    }

    if(!isString(method)) {
      throw new TypeError('Expected method to be string');
    }

    if (!methods.supported(method)) {
      throw new RangeError(`Method '${method}' not supported`);
    }

    if (!isString(body)) {
      throw new TypeError('Expected body to be string');
    }

    if (!isObject(headers, true)) {
      throw new TypeError('Expected headers to be object literal');
    }

    const req = new Request(uri, {
      method : method,
      body   : (isString(body) && methods.get !== method) ? body : undefined,
      mode   : 'cors',
      headers: Object.assign({
        'Content-Type': 'application/json'
      }, headers)
    });

    return fetch(req)
      .then(res => res.json())
      .catch(() => {
        const error = errors.INVALID_RESPONSE;
        throw new SyntaxError(`${error.code}: ${error.message}`);
      });
  }
}
