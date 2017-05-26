import isString from 'lodash.isstring';
import isInteger from 'lodash.isinteger';
import isPlainObject from 'lodash.isplainobject';
import ns from 'src/util/namespace';
import Query from './query';

/**
 * REST Client
 */
export default class RestClient {

  /**
   * Construct a new REST client
   *
   * @param {HttpClient}  httpClient  HTTP Client
   * @param {String}      apiUrl      Base URL of the API
   */
  constructor(httpClient, apiUrl) {
    const internal = ns(this);

    Object.assign(internal, {
      httpClient: httpClient,
      apiUrl    : apiUrl
    });
  }

  /**
   * Perform remote procedure call
   *
   * @param   {String}                  fn    Function name to call
   * @param   {Object<String, String>}  args  Key/Value object with arguments
   * @return  {Promise<Object>}
   */
  rpc(fn, args = {}) {
    const internal = ns(this),
          uri      = `${internal.apiUrl}/rpc/${fn}`;

    if (!isString(fn)) {
      throw new TypeError('Expected function name to be string');
    }

    if (!isPlainObject(args)) {
      throw new TypeError('Expected arguments to be object literal');
    }

    return internal.httpClient.doPost(uri, args);
  }

  /**
   * Find one resource by its ID
   *
   * @param  {String} resource  Name of the resource
   * @param  {Number} id        Resource ID
   * @return {Promise<Object>}
   */
  findOne(resource, id) {
    const internal = ns(this),
          uri      = `${internal.apiUrl}/${resource}`,
          params   = {
            id: `eq.${id}`
          },
          headers = {
            Accept: 'application/vnd.pgrst.object'
          };

    if (!isString(resource)) {
      throw new TypeError('Expected resource to be string');
    }

    if (!isInteger(id)) {
      throw new TypeError('Expected ID to be positive integer');
    }

    return internal.httpClient.doGet(uri, params, headers);
  }

  /**
   * Find a recordset based on a specified query
   *
   * @param  {Query} query  The query
   * @return {Promise<Object>}
   */
  find(query) {
    if (!(query instanceof Query)) {
      throw new TypeError('Query expected');
    }
    if (!query.resource) {
      throw new Error('No resource specified');
    }

    const internal = ns(this),
          uri      = `${internal.apiUrl}/${query.resource}`,
          params   = {},
          headers  = {},
          fields   = query.selection.toString(),
          filters  = query.filter.toKeyVal(),
          order    = query.sort.toString();

    // optionally add selection to parameters
    if (0 < fields.length) {
      Object.assign(params, {
        selection: fields
      });
    }

    // optionally add filters to parameters
    if (0 < Object.keys(filters).length) {
      Object.assign(params, filters);
    }

    // optionally add sorting to parameters
    if (0 < order.length) {
      Object.assign(params, {
        order: order
      });
    }

    // optionally add range to headers
    if (!query.range.isAll) {
      Object.assign(headers, {
        'Range-Unit': 'items',
        Range       : `${query.range.offset}-${Infinity === query.range.limit ? '' : query.range.limit}`
      });
    }

    // hand off to HTTP client
    return internal.httpClient.doGet(uri, params, headers);
  }
}
