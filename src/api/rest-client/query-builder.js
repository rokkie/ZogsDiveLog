import isArray from 'lodash.isarray';
import isPlainObject from 'lodash.isplainobject';
import isString from 'lodash.isstring';
import ns from 'src/util/namespace';
import Predicate from './predicate';
import Query from './query';

/**
 * @class {QueryBuilder}
 *
 * @example
 * const qb = new QueryBuilder();
 * qb.select(['foo', 'bar'])
 *   .from('FooBar')
 *   .where('name', 'eq', 'Foo')
 *   .where('dob', 'gt', new Date(), true);
 *   .order({
 *     foo: 'asc',
 *     bar: 'desc'
 *   })
 *   .limit(10, 100);
 */
export default class QueryBuilder {

  /**
   * Construct a new QueryBuilder
   */
  constructor() {
    const internal = ns(this);

    Object.assign(internal, {
      query: new Query()
    });
  }

  /**
   * TODO: Let this return a clone
   * @type {Query}
   */
  get query() {
    return ns(this).query;
  }

  /**
   * Adds fields to the selection
   *
   * @example
   * const qb = new QueryBuilder();
   * qb.select('foo');
   *
   * @example
   * const qb = new QueryBuilder();
   * qb.select(['foo', 'bar']);
   *
   * @example
   * const qb = new QueryBuilder();
   * qb.select({
   *   fooAlias: 'foo',
   *   barAlias: 'bar',
   *   bazAlias: 'baz'
   * });
   *
   * @example
   * const qb = new QueryBuilder();
   * qb.select([
   *   ['fooAlias', 'foo'],
   *   ['barAlias', 'bar'],
   *   ['bazAlias', 'baz']
   * ]);
   *
   * @param   {Array|Object|String} fields  Fields to add to the selection
   * @return  {QueryBuilder}
   */
  select(fields) {
    const selection = ns(this).query.selection;

    if (isString(fields)) {
      selection.addField(fields);
    } else {
      selection.addFields(fields);
    }

    return this;
  }

  /**
   * Sets the name of the resource
   *
   * @example
   * const qb = new QueryBuilder();
   * qb.from('FooBar');
   *
   * @param  {String} resource Name of the resource
   * @return {QueryBuilder}
   */
  from(resource) {
    ns(this).query.resource = resource;

    return this;
  }

  /**
   * Add a where clause to the query by 'and'
   *
   * @example
   * const qb = new QueryBuilder();
   * qb.where('name', 'eq', 'Foo')            // WHERE name = Foo
   *   .where('dob', 'gt', new Date(), true); // AND !(dob > 'now')
   *
   * @param  {String}                           column            Column name to apply the predicate on
   * @param  {String}                           operator          Operator to use as predicate
   * @param  {String|Number|Boolean|Array|Date} value             Value to apply for predicate
   * @param  {Boolean}                          [negate = false]  If the operator should be negated
   * @return {QueryBuilder}
   */
  where(column, operator, value, negate = false) {
    const filter    = ns(this).query.filter,
          predicate = new Predicate(column, operator, value, negate);

    filter.addPredicate(predicate);

    return this;
  }

  /**
   * Sets the sorting order of the resultset
   *
   * @example
   * const qb = new QueryBuilder();
   * qb.order('foo', 'asc');
   *
   * @example
   * const qb = new QueryBuilder();
   * qb.order({
   *   foo: 'asc',
   *   bar: 'desc'
   * });
   *
   * @example
   * const qb = new QueryBuilder();
   * qb.order([
   *   ['foo', 'asc'],
   *   ['bar', 'desc'],
   * ]);
   *
   * @param  {String|Object|Array}  column      Column to sort on or key-values with column and direction
   * @param  {String}               [direction] Direction to sort in
   * @return {QueryBuilder}
   */
  order(column, direction) {
    const sort = ns(this).query.sort;

    if (!direction && (isPlainObject(column) || isArray(column))) {
      const sorting = column;

      if (isPlainObject(sorting)) {
        Object.keys(sorting).forEach(key => sort.set(key, sorting[key]));
      } else if (isArray(sorting)) {
        sorting.forEach(([column, direction]) => sort.set(column, direction));
      }
    } else {
      sort.set(column, direction);
    }

    return this;
  }

  /**
   * Sets the range of the resultset
   *
   * @example
   * const qb = new QueryBuilder();
   * qb.limit(10, 100); // sets offset to 10 and limit to 100
   *
   * @example
   * const qb = new QueryBuilder();
   * qb.limit(10); // sets limit to 10
   *
   * @param  {Number}  offset   Offset of the resultset, acts as limit if second argument is omitted
   * @param  {Number}  [limit]  Length of the resultset
   * @return {QueryBuilder}
   */
  limit(offset, limit) {
    const range = ns(this).query.range;

    if (!limit) {
      range.limit = offset;
    } else {
      range.offset = offset;
      range.limit  = limit;
    }

    return this;
  }

  /**
   * Reset the query
   *
   * @return {QueryBuilder}
   */
  reset() {
    ns(this).query = new Query();

    return this;
  }
}
