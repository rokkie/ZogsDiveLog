import * as http from '../http/index';

const API_URL        = 'http://localhost:3000/',
      // REST_RESOURCES = ['user', 'diver', 'dive'],
      RPC_ACTIONS    = ['signup', 'login'];

function rpc (action, params) {
  if (!RPC_ACTIONS.includes(action.toLowerCase())) {
    throw new Error(`Invalid RPC action '${action}'`);
  }

  let uri   = `${API_URL}rpc/${action.toLowerCase()}`,
      body  = params;

  return http.post(uri, body)
    .then(res => res);  // TODO: check success etc.
}


export function login (identity, credential) {
  return rpc('login', {
    email_address: identity,
    password     : credential
  }).then(res => res.token);  // TODO: store token
}
