'use strict';
var path = require('path');

/**
 * return required module based on key
 * @param  {string} key     key used for lookup
 * @param  {object} modules contains options to be required.
 *                          key is lookup key, value is module to be required
 * @param  {mixed} key      if key not found, this is required and returned if string
 *                          returns passed in if not string
 *                          returns null by fallback
 * @return {object}         selected module
 */
module.exports = function(key, modules, fallback) {
  // validate inputs
  validate(key, modules);
  // if key is in modules, return required
  if (modules[key]) {
    var item = modules[key];
    item = patchIfPath(modules[key]);

    return require(item);
  }

  // key not found, return fallback
  return getFallback(fallback);
};


/**
 * ensure inputs are correct, throw if not
 * @param  {string} key     should be string
 * @param  {[type]} modules should be object (not arrary)
 */
function validate (key, modules) {
  if (typeof key !== 'string' || key.length <= 0) {
    throw new Error('key should be a non-empty string');
  }

  if (typeof modules !== 'object' || Array.isArray(modules)) {
    throw new Error('modules should be an object');
  }
}

/**
 * returns fallback. defaults to null
 * @param {mixed} fallback
 *        if fallback is a string, returned required module
 *        return fallback if anything else
 */
function getFallback (fallback) {
  // return null if nothing specified
  if (!fallback) {
    return null;
  }
  // if string, return required module
  if (typeof fallback === 'string') {
    fallback = patchIfPath(fallback);

    return require(fallback);
  }
  // if anything else, return what was passed
  return fallback;
}

 /**
  * if input is a relative path, patch it with correct location
  * @param  {string} item string of module to require
  * @return {string}      patched relative path, or unchanged input
  */
function patchIfPath (item) {
  if (/\.?\.\//.test(item)) {
    return path.resolve(path.dirname(module.parent.filename), item);
  }

  return item;
}