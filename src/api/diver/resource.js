import ns from 'zogs-js/src/util/object/namespace';
import isString from 'zogs-js/src/util/is/string';
import HttpClient from '../http-client/client';
import RestClient from '../rest-client/client';
import Filter from '../rest-client/filter';
import Selection from '../rest-client/selection';
import DiverModel from './model';
import DiverCollection from './collection';

const RESOURCE_NAME = 'diver';

/**
 * @class {DiverResource}
 */
export default class DiverResource {

  /**
   *
   * @param  {String} apiUrl
   * @return {DiverResource}
   */
  static factory(apiUrl) {
    if (!isString(apiUrl)) {
      throw new TypeError('Expected apiUrl to be string');
    }

    const httpClient = new HttpClient(),
          restClient = new RestClient(httpClient, apiUrl);

    return new DiverResource(restClient);
  }

  /**
   *
   * @param {RestClient}  restClient
   */
  constructor(restClient) {
    const internal = ns(this);

    Object.assign(internal, {
      restClient: restClient
    });
  }

  /**
   *
   * @param  {Number} id
   * @return {Promise<DiverModel>}
   */
  findOne(id) {
    return ns(this).restClient
      .findOne(RESOURCE_NAME, id)
      .then(obj => DiverModel.factory(obj));
  }

  /**
   *
   * @param  {Filter} [filter = new Filter()]
   * @return {Promise<DiverCollection>}
   */
  findAll(filter = new Filter()) {
    return ns(this).restClient
      .findAll(RESOURCE_NAME, new Selection(), filter)
      .then(list => new DiverCollection(list.map(DiverModel.factory)));
  }
}
