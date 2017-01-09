const SUPPORTED_METHODS = ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'];

function request (uri, method, body = '', headers = {}) {
  if (!SUPPORTED_METHODS.includes(method.toUpperCase())) {
    throw new Error(`Method '${method}' not supported`);
  }

  let req = new Request(uri, {
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

export function post (uri, data) {

  return request(uri, 'POST', JSON.stringify(data));

}
