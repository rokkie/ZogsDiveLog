import chunk from 'lodash.chunk';
import isString from 'lodash.isstring';
import ns from 'src/util/namespace';
import HttpClient from '../http-client/client';
import RestClient from '../rest-client/client';
import QueryBuilder from '../rest-client/query-builder';
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
   * Construct a new DiverResource
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
   * Find one Diver by ID
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
   * Find a list of Divers based on a set of predicates
   * TODO: negation
   *
   * @param  {...*} args Predicates
   * @return {Promise<DiverCollection>}
   */
  find(...args) {
    const qb  = new QueryBuilder(),
          len = Math.floor(args.length / 3) * 3;

    qb.from(RESOURCE_NAME);

    chunk(args, 3)
      .slice(0, len)
      .forEach(predicate => qb.where(...predicate));

    return ns(this).restClient
      .find(qb.query)
      .then(list => new DiverCollection(list.map(DiverModel.factory)));
  }
}
