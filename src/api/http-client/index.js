import toQueryString from 'zogs-js/src/util/url/to-query-string';

const SUPPORTED_METHODS = ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'];

/**
 *
 */
export default class HttpClient {

  /**
   *
   */
  constructor() {
  }

  doGet (uri, params = {}, headers = {}) {
    return this.doRequest(`${uri}?${toQueryString(params)}`, 'GET', '', headers);
  }

  doPut () {

  }

  doPatch () {

  }

  doPost (uri, data) {
    return this.doRequest(uri, 'POST', JSON.stringify(data));
  }

  doDelete () {

  }

  /**
   *
   * @param  {String}  uri
   * @param  {String}  method
   * @param  {String}  [body]
   * @param  {Object}  [headers]
   * @return {Promise<TResult>}
   */
  doRequest(uri, method, body = '', headers = {}) {
    if (!SUPPORTED_METHODS.includes(method.toUpperCase())) {
      throw new Error(`Method '${method}' not supported`);
    }

    const req = new Request(uri, {
      method : method,
      body   : body,
      mode   : 'cors',
      headers: Object.assign({}, {
        'Content-Type': 'application/json'
      }, headers)
    });

    return fetch(req)
    .then(res => res.json(), res => {
      // TODO: panic
      return res;
    });
  }
}
