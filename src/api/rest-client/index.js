import ns from 'zogs-js/src/util/object/namespace';

/**
 *
 */
export default class RestClient {

  /**
   *
   * @param {HttpClient}  httpClient
   * @param {String}      apiUrl
   */
  constructor(httpClient, apiUrl) {
    const internal = ns(this);

    Object.assign(internal, {
      httpClient: httpClient,
      apiUrl    : apiUrl
    });
  }

  findOne(resource, id) {
    const internal = ns(this),
          uri      = `${internal.apiUrl}/${resource}`,
          params   = {
            id: `eq.${id}`
          },
          headers = {
            Prefer: 'plurality=singular'
          };

    return internal.httpClient.doGet(uri, params, headers);
  }

  // findAll(resource) {
  //
  // }
}
