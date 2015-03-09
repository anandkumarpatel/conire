'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.test;
var Code = require('code');
var expect = Code.expect;

var conair = require('../index.js');

describe('conair', function () {
  describe('correct usage', function () {
    it('should return correct module', function(done) {
      var test = conair('test3', {
        test1: 'path',
        test2: 'stream',
        test3: 'fs'
      });
      expect(test).to.equal(require('fs'));
      done();
    });

    it('should return correct module with relative file path', function(done) {
      var test = conair('test1', {
        test1: './fixtures/one.js',
        test2: './fixtures/two.js',
        test3: './fixtures/three.js'
      });
      expect(test()).to.equal(1);
      done();
    });

    it('should return correct module with insane relative file path', function(done) {
      var test = conair('test2', {
        test1: './fixtures/one.js',
        test2: '../test/../test/fixtures/two.js',
        test3: './fixtures/three.js'
      });
      expect(test()).to.equal(2);
      done();
    });

    it('should return null if empty object', function(done) {
      var test = conair('fake', {});
      expect(test).to.equal(null);
      done();
    });

    it('should return required fallback if empty object', function(done) {
      var test = conair('fake', {}, 'fs');
      expect(test).to.equal(require('fs'));
      done();
    });

    it('should return raw fallback if empty object', function(done) {
      var thing = {a:1};
      var test = conair('fake', {}, thing);
      expect(test).to.equal(thing);
      done();
    });

    it('should return null if key does not exist and no fallback', function(done) {
      var test = conair('fake', {
        test1: './fixtures/one.js',
        test2: '../test/../test/fixtures/two.js',
        test3: './fixtures/three.js'
      });
      expect(test).to.equal(null);
      done();
    });
  });
  describe('incorrect usage', function () {
    [{}, [], null, undefined, {a:1}, '', false, true].forEach(function(testKey) {
      it('should error if invalid key '+testKey, function(done) {
        try {
          conair(testKey, {});
        } catch (err) {
          return done();
        }
        done(new Error('should have thrown invalid input'));
      });
    });
    [[], null, undefined, '', false, true, 'fake'].forEach(function(testModule) {
      it('should error if invalid modulelist '+testModule, function(done) {
        try {
          conair('test', testModule);
        } catch (err) {
          return done();
        }
        done(new Error('should have thrown invalid input'));
      });
    });
  });
});