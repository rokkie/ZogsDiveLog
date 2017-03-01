#!/usr/bin/env node

const cp   = require('child_process'),
      path = require('path'),
      conf = require('./conf');

/**
 * Start PostgREST server
 *
 * @return {Promise<boolean>}
 */
function postgrest () {
  console.info('Making sure the PostgREST server is running');
  console.warn('Not implemented');
  return Promise.resolve(true);
}

/**
 * Initialize the data fixture
 *
 * @param  {String} host    DB host
 * @param  {String} user    DB user
 * @param  {String} dbname  DB name
 * @return {Promise}
 */
function fixture ({host, user, dbname}) {
  const sql = path.resolve(__dirname, 'fixture.sql'),
        cmd = `psql -h ${host} -U ${user} -d ${dbname} -f ${sql}`;

  console.info('Initializing the data fixture');
  return new Promise((resolve, reject) => {
    cp.exec(cmd, err => (err) ? reject(err) : resolve());
  });
}

// Fire!
postgrest()
  .then(fixture.bind(undefined, conf.db))
  .then(() => {
    console.info('Ready to rumble!');
    process.exit(0);
  }, err => {
    console.error(err);
    process.exit(1);
  });
