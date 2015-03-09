# conire
conditional require of modules

# usage
```
var conire = require('conire')
// key used to find which module to require
var key = process.env.NODE_ENV;

// object containing module to be required
// key is used for lookup
// value is the name (string) of the module that needs to be required
// can not be an array
var drivers = {
  test: '../fixtures/mockHttp.js',
  production: 'secureHttp',
  development: 'looseHttp'
}

// optional fallback, defaults to null
// if string, it is treated as a module that needs to be required
// if anything else, it returns exactly what was passed in
var fallback = 'defaultHttp'

var networkDriver = conire(key, drivers, fallback);
```