import ns from 'src/util/namespace';
import Filter from './filter';
import Selection from './selection';
import Sort from './sort';
import Range from './range';
import {
  string as isString,
  object as isObject,
  integer as isInteger
} from 'zogs-js/src/util/is';

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

    if (!isObject(args, true)) {
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
   * Find fields of resources matching a set of predicates
   *
   * @param  {String}     resource  Name of the resource
   * @param  {Selection}  [selection = new Selection()] Selection of fields
   * @param  {Filter}     [filter = new Filter()]       Predicates to filter on
   * @param  {Sort}       [sorting = new Sort()]        Sort order
   * @param  {Range}      [range = new Range()]         Item range
   * @return {Promise<Object>}
   */
  findAll(resource, selection = new Selection(), filter = new Filter(), sorting = new Sort(), range = new Range()) {
    const internal = ns(this),
          uri      = `${internal.apiUrl}/${resource}`,
          params   = {},
          headers  = {},
          fields   = selection.strval,
          filters  = filter.keyval,
          order    = sorting.strval;

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
    if (!range.isAll) {
      Object.assign(headers, {
        'Range-Unit': 'items',
        Range       : `${range.offset}-${Infinity === range.limit ? '' : range.limit}`
      });
    }

    // hand off to HTTP client
    return internal.httpClient.doGet(uri, params, headers);
  }
}
