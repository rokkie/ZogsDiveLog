import ns from 'zogs-js/src/util/object/namespace';
import HttpClient from '../http-client/index';
import RestClient from '../rest-client/index';
import DiverModel from './model';

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
  findAll() {
    return ns(this).restClient.findAll(RESOURCE_NAME);
  }
}
