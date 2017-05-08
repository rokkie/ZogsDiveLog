import isArray from 'lodash.isarray';
import isString from 'lodash.isstring';
import ns from 'src/util/namespace';
import {object as isObject} from 'zogs-js/src/util/is';

/**
 * Field selection
 */
export default class Selection {

  /**
   * Construct a selection
   *
   * @param {Array|Object} [fields = undefined] Field names to include in the selection
   */
  constructor(fields = undefined) {
    const internal = ns(this);

    Object.assign(internal, {
      fields: new Map()
    });

    if (undefined !== fields) {
      this.addFields(fields);
    }
  }

  /**
   * Add multiple fields to the selection
   *
   * @example
   * const selection = new Selection();
   * selection.addFields(['foo', 'bar']);
   *
   * @example
   * const selection = new Selection();
   * selection.addFields({
   *   fooAlias: 'foo',
   *   barAlias: 'bar',
   *   bazAlias: 'baz'
   * });
   *
   * @example
   * const selection = new Selection();
   * selection.addFields([
   *   ['fooAlias', 'foo'],
   *   ['barAlias', 'bar'],
   *   ['bazAlias', 'baz']
   * ]);
   *
   * @param {Array|Object} fields Fields to add
   */
  addFields(fields) {
    if (isArray(fields)) {
      fields.forEach(field => {
        const args = [];

        if (isString(field)) {
          args.push(field);
        } else if (isArray(field) && 2 === field.length) {
          args.push(field[1], field[0]);
        } else {
          throw new TypeError('Field definition should be string, array');
        }

        this.addField(...args);
      });
    } else if (isObject(fields, true)) {
      Object.keys(fields).forEach(key => {
        this.addField(fields[key], key);
      });
    } else {
      throw new TypeError('Field definitions should be array or object literal');
    }
  }

  /**
   * Add a field to the selection
   *
   * @param {String|Array|Object}  field                Name of the field
   * @param {String}               [alias = undefined]  Field alias
   */
  addField(field, alias = undefined) {
    const internal  = ns(this);

    if (!isString(field) && !isArray(field) && !isObject(field, true)) {
      throw new TypeError('Field should be string, array of object literal');
    }
    if (undefined !== alias && !isString(alias)) {
      throw new TypeError('Alias should be string if provided');
    }
    if (undefined === alias && !isString(field)) {
      throw new Error('Alias is required if field is not string');
    }

    const key   = isString(alias) ? alias : field,
          value = isString(field) ? field : new Selection(field);

    internal.fields.set(key, value);
  }

  /**
   * Remove a field from the selection
   *
   * @param {String}  field Name of the field
   */
  removeField(field) {
    const internal = ns(this);

    if (!isString(field)) {
      throw new TypeError('Field name should be string');
    }

    if (internal.fields.has(field)) {
      internal.fields.delete(field);
    }
  }

  /**
   * Get iterator
   *
   * @return {Iterator<String, String>}
   */
  [Symbol.iterator]() {
    return ns(this).fields.entries();
  }

  /**
   * @type {String}
   */
  get strval() {
    return Array.from(this)
      .reduce((acc, [alias, field]) => {
        let str;

        if (alias === field) {
          str = field;
        } else if (isString(field)) {
          str = `${alias}:${field}`;
        } else if (field instanceof Selection) {
          str = `${alias}{${field.strval}}`;
        }

        return acc.concat(str);
      }, [])
      .join(',');
  }
}
