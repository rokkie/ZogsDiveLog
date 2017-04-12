#!/usr/bin/env node

const cp   = require('child_process'),
      path = require('path'),
      conf = require('./conf');

/**
 * Stop PostgREST server
 *
 * @return {Promise<boolean>}
 */
function postgrest () {
  console.info('Shutting down the PostgREST server');
  console.warn('Not implemented');
  return Promise.resolve(true);
}

/**
 * Clean the database
 *
 * @param  {String} host    DB host
 * @param  {String} user    DB user
 * @param  {String} dbname  DB name
 * @return {Promise}
 */
function cleandb ({host, user, dbname}) {
  const sql = path.resolve(__dirname, 'clean-db.sql'),
        cmd = `psql -h ${host} -U ${user} -d ${dbname} -f ${sql}`;

  console.info('Cleaning up the database');
  return new Promise((resolve, reject) => {
    cp.exec(cmd, err => (err) ? reject(err) : resolve());
  });
}

// Fire!
cleandb(conf.db)
  .then(postgrest, err => {
    console.error(err);
    process.exit(1);
  })
  .then(() => {
    console.info('All done!');
    process.exit(0);
  });
